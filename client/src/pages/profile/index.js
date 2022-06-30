import React, { useState, useEffect } from 'react';
import { Box, Toolbar, AppBar, Typography, CircularProgress, Button, Icon } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import * as api from '../../api';
import useStyles from './styles'

const Profile = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.getSession();
        setData(data)
      } catch (error) {
        console.log(error.message);
      }
      setIsLoading(false);
    };
    getData()
  }, []);

  const renderUser = () => {
    return (
      <Box style={{ padding: '20px 20px' }}>
        <Typography variant="h6">
          {data?.email}
        </Typography>
        <Typography variant="h6">
          Welcome, {data?.user_name}!
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Icon name="delete_forever" />
          <Typography variant="h6" style={{ flex: 1 }}>
            Profile
          </Typography>
          <div>
          <Button
              color="inherit"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate('/profile')}
            >
              Profile
            </Button>
            <Button
              color="inherit"
              onClick={() => window.open("http://localhost:3000/auth/logout", "_self")}
            >
              Signout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      {isLoading ? <CircularProgress /> : null}
      {renderUser()}
    </Box>
  );
}

export default Profile;