import React from "react";
import { useUser } from "reactfire";
import NavBar from "./NavBar";
import Paper from '@material-ui/core/Paper';

function App() {
  const user = useUser();
  console.log(user);
  return (
    <>
      <NavBar />
      <Paper elevation={3} > HELLO WORLD</Paper>
    </>
  );
}

export default App;
