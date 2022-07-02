import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, TextField } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import * as api from '../../api';
import useStyles from './styles'

const SignIn = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async () => {
    console.log('value email: ', email);
    console.log('value password: ', password);
    const res = await api.signIn({
      email,
      password,
    });
    console.log('ress: ', res);
    navigate('/');
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <div className={classes.buttons}>
        <Typography variant="h6" style={{ textAlign: 'center', marginBottom: '20px' }}>
          Sign In
        </Typography>
        <TextField
          autoFocus
          id="email"
          label="Email"
          type="text"
          fullWidth
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
          <TextField
            autoFocus
            id="password"
            label="Password"
            type="text"
            fullWidth
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Sign In
        </Button>
      </div>
    </Box> 
  )
}

export default SignIn;