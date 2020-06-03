import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useUser, useDatabase, useDatabaseList } from "reactfire";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles((theme) => ({
  chat: {
    height: "60vh",
  },
  sendMessage: { marginTop: 16, padding: 8 },
}));

export default function Chat() {
  const handleChange = async (event) => {
    event.preventDefault();
    const value = event.target.value;
    if (event.key === "Enter") {
      await ref.push({
        content: message,
        timestamp: Date.now(),
        author: user.displayName,
      });
    } else {
      setMessage(value);
    }
  };

  const classes = useStyles();
  const user = useUser();
  const db = useDatabase();
  const ref = db.ref("boards/example/messages");
  const changes = useDatabaseList(ref);
  const [message, setMessage] = React.useState("");

  return (
    <div>
      <Paper className={classes.chat} elevation={3}>
        {changes.map(({ snapshot }) => {
          const { content, timestamp, author } = snapshot.val();

          return (
            <p key={snapshot.key}>
              <b>{author}</b>: {content}
            </p>
          );
        })}
      </Paper>
      <Paper className={classes.sendMessage}>
        <Input placeholder="Send a Message" fullWidth onKeyUp={handleChange} />
      </Paper>
    </div>
  );
}
