import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CanvasDraw from "react-canvas-draw";
import { Button, Container, Switch, FormControlLabel, Paper, Grid } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import UndoIcon from '@material-ui/icons/Undo';
import clsx from "clsx";

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
  const classes = useStyles();
  const ref = React.useRef();
  const [brushColor, setColor] = React.useState(colors.black);
  const [brushThickness, setBrushThickness] = React.useState(2);
  const [lazyBrushEnabled, setLazyBrushEnabled] = React.useState(false);
  return (
    <>
      <Paper className={classes.canvas} elevation={3}>
        <CanvasDraw
          ref={ref}
          canvasWidth={"100%"}
          canvasHeight={"100%"}
          lazyRadius={lazyBrushEnabled ? 30 : 0}
          brushColor={brushColor}
          brushRadius={brushThickness}
          onChange={(change) => console.log(change)}
        />
      </Paper>
      <Paper className={classes.options} elevation={3}>
        <Container>
          <Grid container spacing={3}>
            {Object.keys(colors).map((color) => {
              return (
                <Grid item key={color} xs={1}>
                  <div
                    className={clsx(classes.circle, classes[color])}
                    onClick={() => setColor(colors[color])}
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
                  onClick={() => setBrushThickness(thickness)}
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
              <Button
                variant="contained"
                color="default"
                fullWidth={true}
                onClick={() =>
                  console.log(ref.current.lazy.getPointerCoordinates())
                }
              >
                DEBUG:POINTER
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="default"
                fullWidth={true}
                onClick={() =>
                  console.log(JSON.parse(ref.current.getSaveData()))
                }
              >
                DEBUG:SAVE
              </Button>
            </Grid>
            <Grid item xs={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={lazyBrushEnabled}
                    onChange={() => setLazyBrushEnabled(!lazyBrushEnabled)}
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
                onClick={() => ref.current.undo()}
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
                onClick={() => ref.current.clear()}
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
