import React, { useState, useEffect } from 'react';
import { AppBar, Typography, CircularProgress, Button, Box, Toolbar } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import * as api from '../../api';
import useStyles from './styles'
import DataList from '../../components/DataList'

const DashBoard = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const result = await api.getUsers();
        console.log('result: ', result)
        setData(result)
      } catch (error) {
        console.log(error.message);
      }
      setIsLoading(false);
    };
    getData()
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flex: 1 }}>
            Dashboard
          </Typography>
          <div>
          <Button
              color="inherit"
              onClick={() => navigate('/profile')}
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
      {isLoading ?
        <CircularProgress /> : <DataList list={data.data} />}
    </Box>
  );
}

export default DashBoard;