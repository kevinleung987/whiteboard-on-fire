import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CanvasDraw from "react-canvas-draw";
import {
  Button,
  Container,
  Switch,
  FormControlLabel,
  Paper,
  Grid,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import UndoIcon from "@material-ui/icons/Undo";
import clsx from "clsx";
import { useDatabase, useDatabaseList } from "reactfire";
import { currentBoard } from "./../utils/firebaseUtils";

const colors = {
  black: "#444",
  red: "#f44336",
  pink: "#e91e63",
  purple: "#9c27b0",
  deepPurple: "#673ab7",
  indigo: "#3f51b5",
  blue: "#2196f3",
  lightBlue: "#03a9f4",
  cyan: "#00bcd4",
  teal: "#009688",
  green: "#4caf50",
  lightGreen: "#8bc34a",
  lime: "#cddc39",
  yellow: "#ffeb3b",
  amber: "#ffc107",
  orange: "#ff9800",
  deepOrange: "#ff5722",
  brown: "#795548",
  grey: "#9e9e9e",
  blueGrey: "#607d8b",
};

const styles = {
  canvas: {
    width: "100%",
    height: "60vh",
  },
  options: {
    marginTop: 16,
    width: "100%",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: "50%",
  },
};

const thicknesses = [2, 4, 8, 12];

Object.keys(colors).forEach((color) => {
  const colorCode = colors[color];
  styles[color] = { backgroundColor: colorCode };
});

const useStyles = makeStyles((theme) => ({ ...styles }));

export default function Canvas() {
  const sendUpdate = () => {
    const parsed = JSON.parse(ref.current.getSaveData());
    if (parsed.lines.length === 0) return;
    const latestLine = parsed.lines[parsed.lines.length - 1];
    console.log("UPDATE SENT");
    linesRef.push(latestLine);
  };

  const sendClear = () => {
    linesRef.set(null);
  };

  const sendUndo = () => {
    linesRef.limitToLast(1).once("value", (snapshot) => {
      if (!snapshot.val()) return;
      db.ref(
        `boards/${currentBoard()}/lines/${Object.keys(snapshot.val())[0]}`
      ).remove();
    });
  };

  const classes = useStyles();
  const ref = React.useRef();
  const [brushColor, setColor] = React.useState(colors.black);
  const [brushThickness, setBrushThickness] = React.useState(2);
  const [lazyBrushEnabled, setLazyBrushEnabled] = React.useState(false);
  let [updated, setUpdated] = React.useState(false);

  const canvas = (
    <CanvasDraw
      ref={ref}
      canvasWidth={"100%"}
      canvasHeight={"100%"}
      loadTimeOffset={0}
      lazyRadius={lazyBrushEnabled ? 30 : 0}
      brushColor={brushColor}
      brushRadius={brushThickness}
      onChange={() => {
        if (updated) {
          console.log("UPDATE ATTEMPT");
          sendUpdate();
          setUpdated(null);
        } else {
          console.log("NOT UPDATED");
        }
      }}
    />
  );

  const db = useDatabase();
  const linesRef = db.ref(`boards/${currentBoard()}/lines`);
  linesRef.off();
  linesRef.on("value", (snapshot) => {
    if (updated == null) {
      updated = false;
      return;
    }
    const lines = { ...snapshot.val() };
    console.log("INCOMING VALUE");
    if (ref.current) {
      ref.current.loadSaveData(
        JSON.stringify({
          lines: Object.keys(lines).map((id) => lines[id]),
          width: "100%",
          height: "100%",
        })
      );
    }
  });
  // This is the hack that lets us send updates on draw
  if (ref.current && ref.current.canvas.interface) {
    ref.current.canvas.interface.onmouseup = (e) => {
      console.log("MOUSE EVENT");
      setUpdated(true);
    };
  }
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
                      setUpdated(null);
                      setColor(colors[color]);
                    }}
                  ></div>
                </Grid>
              );
            })}
            {thicknesses.map((thickness) => {
              return (
                <Grid
                  item
                  key={thickness}
                  xs={1}
                  onClick={() => {
                    setUpdated(null);
                    setBrushThickness(thickness);
                  }}
                >
                  <div
                    style={{
                      borderRadius: "50%",
                      height: thickness * 3,
                      width: thickness * 3,
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
                      setUpdated(null);
                      setLazyBrushEnabled(!lazyBrushEnabled);
                    }}
                    name="lazyBrush"
                    color="primary"
                  />
                }
                label="Lazy Brush"
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth={true}
                onClick={sendUndo}
                startIcon={<UndoIcon />}
              >
                Undo
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth={true}
                onClick={sendClear}
                startIcon={<DeleteIcon />}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
}
