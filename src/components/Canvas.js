import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CanvasDraw from "react-canvas-draw";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  canvas: {
    width: "100%",
    height: "100%",
  },
}));

export default function Canvas() {
  const classes = useStyles();
  return (
    <Paper className={classes.canvas} elevation={3}>
      <CanvasDraw canvasWidth={"100%"} canvasHeight={"100%"} />
    </Paper>
  );
}
