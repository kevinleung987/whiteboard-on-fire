import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useUser } from "reactfire";

import { currentBoard } from "./../utils/firebaseUtils";
import { useDatabase, useDatabaseList } from "reactfire";

const useStyles = makeStyles((theme) => ({
  userList: {
    height: "10vh",
    overflow: "auto",
    marginBottom: 16,
  },
}));

export default function Presence() {
  const classes = useStyles();
  const user = useUser();
  const db = useDatabase();
  const ownStatusRef = db.ref(`status/${user.uid}`);
  const allStatusRef = db.ref("status/");
  const statusChanges = useDatabaseList(allStatusRef);
  ownStatusRef
    .onDisconnect()
    .remove()
    .then(() => {
      ownStatusRef.set({ name: user.displayName, board: currentBoard() });
    });

  return (
    <Paper className={classes.userList} elevation={3}>
      {statusChanges.map(({ snapshot }) => {
        const { name, board } = snapshot.val();
        if (board === currentBoard()) {
          return <span key={snapshot.key}>{name}, </span>;
        }
        return null;
      })}
    </Paper>
  );
}
