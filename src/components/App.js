import React from "react";
import NavBar from "./NavBar";
import Paper from "@material-ui/core/Paper";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  spacer: theme.mixins.toolbar
}));

function App() {
  const classes = useStyles();
  return (
    <>
      <NavBar />
      <div className={classes.spacer} />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
        <Grid item xs={3}>
            <Paper elevation={3}> HELLO WORLD</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3}> HELLO WORLD</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper elevation={3}> HELLO WORLD</Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
