import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, CircularProgress, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import * as api from '../../api';
import useStyles from './styles'
import DataList from '../../components/DataList'

const Profile = () => {
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

  // useEffect(() => {
  //   console.log('userr: ', user)
  //   if (user) {
  //     return navigate('/dashboard');
  //   }
  // }, [navigate, user])

  return (
    <Container maxWidth="md">
      <div className={classes.flexContain}>
        <AppBar
          className={classes.appBar}
          position="static"
          color="inherit"
        >
          <Typography variant="h4" align="center">Profile</Typography>
        </AppBar>
        <Button
          className={classes.button}
          variant="text"
          color="primary"
          onClick={() => navigate('/dashboard')}
        >
          Dashboard
        </Button>
        <Button
          className={classes.button}
          variant="text"
          color="secondary"
          onClick={() => window.open("http://localhost:3000/auth/logout", "_self")}
        >
          SignOut
        </Button>
      </div>
      {isLoading ?
        <CircularProgress /> : <DataList list={data.data} />}
    </Container>
  );
}

export default Profile;