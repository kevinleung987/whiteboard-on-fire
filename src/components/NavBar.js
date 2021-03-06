import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AuthForm from "./AuthForm";
import WhatshotIcon from "@material-ui/icons/Whatshot";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Whiteboard on Fire <WhatshotIcon />
        </Typography>
        <AuthForm authFunc={props.authFunc}/>
      </Toolbar>
    </AppBar>
  );
}
