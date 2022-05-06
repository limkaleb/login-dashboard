import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, CircularProgress } from '@material-ui/core';
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

  return (
    <Container maxWidth="md">
      <AppBar
        className={classes.appBar}
        position="static"
        color="inherit"
      >
        <Typography variant="h4" color="primary" align="center">Dashboard</Typography>
      </AppBar>
      {isLoading ?
        <CircularProgress /> : <DataList list={data.data} />}
    </Container>
  );
}

export default DashBoard;