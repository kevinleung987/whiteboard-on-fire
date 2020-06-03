import React from "react";
import NavBar from "./NavBar";
import Paper from "@material-ui/core/Paper";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Chat from "./Chat";
import Canvas from "./Canvas";
import { useUser } from "reactfire";

const useStyles = makeStyles((theme) => ({
  spacer: theme.mixins.toolbar,
}));

function App() {
  const classes = useStyles();
  const user = useUser();
  return (
    <>
      <NavBar />
      <div className={classes.spacer} />
      {user ? (
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Canvas />
            </Grid>
            <Grid item xs={4}>
              <Chat />
            </Grid>
          </Grid>
        </Container>
      ) : "Please Authenticate."}
    </>
  );
}

export default App;
