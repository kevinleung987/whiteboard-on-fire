import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CanvasDraw from "react-canvas-draw";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button, Container } from "@material-ui/core";

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
  const ref = React.useRef();
  return (
    <>
      <Paper className={classes.canvas} elevation={3}>
        <CanvasDraw
          ref={ref}
          canvasWidth={"100%"}
          canvasHeight={"100%"}
          onChange={(change) => console.log(change)}
        />
      </Paper>
      <Paper className={classes.options} elevation={3}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Button
                onClick={() =>
                  console.log(JSON.parse(ref.current.getSaveData()))
                }
              >
                DEBUG
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button onClick={() => ref.current.clear()}>CLEAR</Button>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
}
