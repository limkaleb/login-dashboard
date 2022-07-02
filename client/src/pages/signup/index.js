import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, TextField } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import * as api from '../../api';
import useStyles from './styles'

const SignUp = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    console.log('value name: ', userName);
    console.log('value email: ', email);
    console.log('value password: ', password);
    const res = await api.signUp({
      user_name: userName,
      email,
      password,
    });
    console.log('ress: ', res)
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
          Sign Up
        </Typography>
        <TextField
            autoFocus
            id="name"
            label="User Name"
            type="text"
            fullWidth
            value={userName}
            onChange={(evt) => setUserName(evt.target.value)}
            />
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
          Sign Up
        </Button>
      </div>
    </Box> 
  )
}

export default SignUp;