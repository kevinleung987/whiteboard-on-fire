import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useAuth, useUser } from "reactfire";
import Typography from "@material-ui/core/Typography";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AuthForm(props) {
  const auth = useAuth();
  const user = useUser();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (name) => {
    await auth.signInAnonymously();
    await auth.currentUser.updateProfile({ displayName: name || "" });
    props.authFunc(true);
    console.log(auth.currentUser);
    setOpen(false);
  };

  const handleSignout = () => {
    props.authFunc(false);
    auth.signOut();
  };

  return (
    <div>
      {user ? (
        <>
          <Typography>
            Welcome, {user.displayName}
            <Button color="inherit" onClick={handleSignout}>
              Sign Out
            </Button>
          </Typography>
        </>
      ) : (
        <Button color="inherit" onClick={handleClickOpen}>
          Login
        </Button>
      )}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Set Nickname</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your desired Nickname below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nickname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleSubmit(name)} color="primary">
            Set
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
