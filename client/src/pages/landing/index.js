import React, { useEffect, useState } from 'react';
import { Button, Box } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles'

const Landing = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:3000/auth/login/success", {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          console.log('rsobjectt: ', resObject)
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  });

  useEffect(() => {
    if (user) {
      return navigate('/dashboard');
    }
  }, [navigate, user])

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <div className={classes.buttons}>
        <Button className={classes.button} variant="contained" color="primary">
          Sign Up
        </Button>
        <Button className={classes.button} variant="outlined">
          Sign In
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={() => window.open("http://localhost:3000/auth/google", "_self")}
        >
          Sign In with Google
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => window.open("http://localhost:3000/auth/facebook", "_self")}
        >
          Sign In with Facebook
        </Button>
      </div>
    </Box> 
  )
}

export default Landing;