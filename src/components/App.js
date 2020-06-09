import {
  Button,
  Container,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useAuth, useDatabase, useDatabaseList, useUser } from "reactfire";

import { currentBoard } from "./../utils/firebaseUtils";
import Canvas from "./Canvas";
import Chat from "./Chat";
import NavBar from "./NavBar";

const useStyles = makeStyles((theme) => ({
  spacer: {
    minHeight: 16,
  },
  paper: {
    padding: 16,
  },
  footer: {
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
  },
}));

function App() {
  const handleSubmit = async (name) => {
    await auth.signInAnonymously();
    await auth.currentUser.updateProfile({ displayName: name || "" });
    setAuthenticated(true);
  };

  const classes = useStyles();
  const auth = useAuth();
  const user = useUser();
  const db = useDatabase();
  const [name, setName] = React.useState("");
  const [roomName, setRoomName] = React.useState("");
  const [authenticated, setAuthenticated] = React.useState(null);
  if (authenticated == null && user && user.displayName) {
    setAuthenticated(true);
  }

  const allStatusRef = db.ref("status/");
  const statusChanges = useDatabaseList(allStatusRef);
  const boardUserCount = {};
  statusChanges.forEach(({ snapshot }) => {
    const { board } = snapshot.val();
    if (boardUserCount[board]) {
      boardUserCount[board] += 1;
    } else {
      boardUserCount[board] = 1;
    }
  });
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
        <Container>
          <Typography variant="h2">{`You're joining board "${currentBoard()}"`}</Typography>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Paper className={classes.paper}>
                <Typography variant="h6">{`Please set your Nickname to join`}</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Nickname"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={name.length === 0}
                      onClick={() => handleSubmit(name)}
                    >
                      Join
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <Typography variant="h6">{`Or you can join/create another board`}</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={9}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Room Name"
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      color="secondary"
                      disabled={roomName.length === 0}
                      onClick={() => (window.location = roomName)}
                    >
                      {Object.keys(boardUserCount).includes(roomName)
                        ? "Join"
                        : "Create"}
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <div>
                      <Typography variant="h6">Active Boards:</Typography>
                    </div>
                    {Object.keys(boardUserCount).map((board) => {
                      return (
                        <div key={board}>
                          {`${board}: ${boardUserCount[board]} user${
                            boardUserCount[board] > 1 ? "s" : ""
                          }`}
                          <Button
                            color="primary"
                            disabled={currentBoard() === board}
                            onClick={() => (window.location = board)}
                          >
                            {currentBoard() === board ? "Current" : "Join"}
                          </Button>
                        </div>
                      );
                    })}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      )}
      <div className={classes.footer}>
        <Typography>
          Created with <Link href="https://firebase.google.com/">Firebase</Link>
          . Check out the source code{" "}
          <Link href="https://github.com/kevinleung987/whiteboard-on-fire">
            here
          </Link>
          .
        </Typography>
      </div>
    </>
  );
}

export default App;
