import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, CircularProgress, Button } from '@material-ui/core';
import * as api from '../../api';
import useStyles from './styles'
import DataList from '../../components/DataList'

const DashBoard = () => {
  const classes = useStyles();
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

  // useEffect(() => {
  //   console.log('userr: ', user)
  //   if (user) {
  //     return navigate('/dashboard');
  //   }
  // }, [navigate, user])

  return (
    <Container maxWidth="md">
      <AppBar
        className={classes.appBar}
        position="static"
        color="inherit"
      >
        <Typography variant="h4" color="primary" align="center">Dashboard</Typography>
      </AppBar>
      <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={() => window.open("http://localhost:3000/auth/logout", "_self")}
        >
          Sign Out
        </Button>
      {isLoading ?
        <CircularProgress /> : <DataList list={data.data} />}
    </Container>
  );
}

export default DashBoard;