import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AuthForm from './AuthForm';
import WhatshotIcon from '@material-ui/icons/Whatshot';


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

export default function NavBar() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
      <WhatshotIcon />
        <Typography variant="h6" className={classes.title}>
        First Week Project
        </Typography>
        <AuthForm />
      </Toolbar>
    </AppBar>
  );
}
