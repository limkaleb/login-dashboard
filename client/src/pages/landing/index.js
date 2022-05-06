import React from 'react';
import { Button, Box } from '@material-ui/core';
import useStyles from './styles'

const Landing = () => {
  const classes = useStyles();
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
      </div>
    </Box> 
  )
}

export default Landing;