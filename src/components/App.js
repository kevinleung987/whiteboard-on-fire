import { Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useUser } from "reactfire";

import Canvas from "./Canvas";
import Chat from "./Chat";
import NavBar from "./NavBar";
import { currentBoard } from "./../utils/firebaseUtils";

const useStyles = makeStyles((theme) => ({
  spacer: {
    minHeight: 16
  },
}));

function App() {
  const classes = useStyles();
  const user = useUser();
  const [authenticated, setAuthenticated] = React.useState(null);
  if (authenticated == null && user && user.displayName) {
    setAuthenticated(true);
  }
  return (
    <>
      <NavBar authFunc={setAuthenticated} />
      <div className={classes.spacer} />
      {authenticated ? (
        <Container>
          <Typography variant="h2">{`You're drawing on board "${currentBoard()}"`}</Typography>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Canvas />
            </Grid>
            <Grid item xs={3}>
              <Chat />
            </Grid>
          </Grid>
        </Container>
      ) : (
        "Please Authenticate."
      )}
    </>
  );
}

export default App;
