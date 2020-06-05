import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useAuth, useDatabase, useUser } from "reactfire";

export default function AuthForm(props) {
  const db = useDatabase();
  const auth = useAuth();
  const user = useUser();

  const handleSignout = () => {
    const ownStatusRef = db.ref(`status/${user.uid}`);
    ownStatusRef.remove();
    props.authFunc(false);
    auth.signOut();
  };

  return (
    <div>
      {user ? (
        <>
          <Typography>
            Welcome, {user.displayName}
            <Button
              style={{ marginLeft: 16 }}
              variant="contained"
              color="secondary"
              onClick={handleSignout}
            >
              Sign Out
            </Button>
          </Typography>
        </>
      ) : null}
    </div>
  );
}
