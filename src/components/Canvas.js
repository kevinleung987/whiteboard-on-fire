import {
  Button,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import clsx from "clsx";
import React from "react";
import CanvasDraw from "react-canvas-draw";
import { useDatabase } from "reactfire";

import { colors, thicknesses } from "./../utils/constants";
import { currentBoard } from "./../utils/firebaseUtils";
import { SliderPicker } from "react-color";
import * as LZString from 'lz-string';

const styles = {
  canvas: {
    width: "100%",
    height: "60vh",
  },
  options: {
    marginTop: 16,
    width: "100%",
    backgroundColor: "grey"
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: "50%",
  },
};

// Add pre-defined colors to styles
Object.keys(colors).forEach((color) => {
  const colorCode = colors[color];
  styles[color] = { backgroundColor: colorCode };
});

const useStyles = makeStyles((theme) => ({ ...styles }));

export default function Canvas() {
  const classes = useStyles();

  // State variables
  const ref = React.useRef();
  const [brushColor, setColor] = React.useState(colors.black);
  const [brushThickness, setBrushThickness] = React.useState(thicknesses[0]);
  const [lazyBrushEnabled, setLazyBrushEnabled] = React.useState(false);
  let updated = false; // Whether state update comes from self

  // RTDB Interaction
  const db = useDatabase();
  const linesRef = db.ref(`boards/${currentBoard()}/lines`);
  linesRef.off();
  linesRef.on("child_added", (snapshot) => {
    if (updated === true) {
      updated = false;
      return;
    }
    const compressed = snapshot.val();
    const decompressed = LZString.decompressFromUTF16(compressed);
    const newLine = JSON.parse(decompressed);
    if (ref.current) {
      updated = false;
      // Stroke points that are currently being drawn - mouse button still held down
      const oldPoints = ref.current.points;
      // Draw the incoming update
      ref.current.drawPoints(newLine);
      ref.current.points = newLine.points;
      ref.current.saveLine({
        brushColor: newLine.brushColor,
        brushRadius: newLine.brushRadius,
      });
      // Restore in-progress stroke points
      ref.current.points = oldPoints;
      if (oldPoints.length > 0) {
        ref.current.drawPoints({
          points: oldPoints,
          brushColor,
          brushRadius: brushThickness,
        });
      }
    }
  });
  linesRef.on("child_removed", (snapshot) => {
    ref.current.clear();
  });

  const sendUpdate = () => {
    const parsed = JSON.parse(ref.current.getSaveData());
    if (parsed.lines.length === 0) return;
    const latestLine = parsed.lines[parsed.lines.length - 1];
    const compressed = LZString.compressToUTF16(JSON.stringify(latestLine))
    linesRef.push(compressed);
  };

  const sendClear = () => {
    linesRef.set(null);
    ref.current.clear();
  };

  // Hack that lets us flag which updates are ours
  if (ref.current && ref.current.canvas.interface) {
    ref.current.canvas.interface.onmouseup = (e) => {
      updated = true;
    };
  }

  const canvas = (
    <CanvasDraw
      ref={ref}
      canvasWidth={"100%"}
      canvasHeight={"100%"}
      loadTimeOffset={0}
      immediateLoading={true}
      hideGrid={true}
      lazyRadius={lazyBrushEnabled ? 20 : 0}
      catenaryColor={brushColor}
      brushColor={brushColor}
      brushRadius={brushThickness}
      onChange={() => {
        if (updated) {
          sendUpdate();
          updated = null;
        }
      }}
    />
  );
  return (
    <>
      <Paper className={classes.canvas} elevation={3}>
        {canvas}
      </Paper>
      <Paper className={classes.options} elevation={3}>
        <Container>
          <Grid container spacing={3}>
            {Object.keys(colors).map((color) => {
              return (
                <Grid item key={color} xs={1}>
                  <div
                    className={clsx(classes.circle, classes[color])}
                    onClick={() => {
                      updated = null;
                      setColor(colors[color]);
                    }}
                  ></div>
                </Grid>
              );
            })}
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="default"
                fullWidth={true}
                onClick={() => setColor("white")}
              >
                Eraser
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth={true}
                onClick={sendClear}
                startIcon={<DeleteIcon />}
              >
                Clear
              </Button>
            </Grid>
            <Grid item xs={4}>
              <SliderPicker
                color={brushColor}
                onChangeComplete={(c) => setColor(c.hex)}
              />
            </Grid>
            {thicknesses.map((thickness) => {
              return (
                <Grid
                  item
                  key={thickness}
                  xs={1}
                  onClick={() => {
                    updated = null;
                    setBrushThickness(thickness);
                  }}
                >
                  <div
                    style={{
                      borderRadius: "50%",
                      height: thickness * 2,
                      width: thickness * 2,
                      backgroundColor: brushColor,
                    }}
                  ></div>
                </Grid>
              );
            })}
            <Grid item xs={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={lazyBrushEnabled}
                    onChange={() => {
                      updated = null;
                      setLazyBrushEnabled(!lazyBrushEnabled);
                    }}
                    name="lazyBrush"
                    color="primary"
                  />
                }
                label="Lazy Brush"
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
}
