import React, { useState } from 'react';
import { Button, Box, Typography, TextField } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import * as api from '../../api';
import useStyles from './styles'

const SignIn = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async () => {
    try {
      setProcessing(true);
      const res = await api.signIn({
        email,
        password,
      });
      console.log('ress: ', res);
      navigate('/');
    } catch (e) {
      console.error(e);
    } finally {
      setProcessing(false);
    }
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
            type="password"
            fullWidth
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={processing}
        >
          Sign In
        </Button>
      </div>
    </Box> 
  )
}

export default SignIn;