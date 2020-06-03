import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CanvasDraw from "react-canvas-draw";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  canvas: {
    width: "100%",
    height: "90%",
  },
  options: {
    marginTop: 16,
    width: "100%",
    height: "10%",
  },
}));

export default function Canvas() {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.canvas} elevation={3}>
        <CanvasDraw canvasWidth={"100%"} canvasHeight={"100%"} />
      </Paper>
      <Paper className={classes.options} elevation={3}>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            Red
          </Grid>
          <Grid item xs={2}>
            Blue
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
