import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useAuth, useUser } from 'reactfire';

export default function AuthForm(props) {
  const auth = useAuth();
  const user = useUser();

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
            <Button
              style={{marginLeft: 16}}
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
