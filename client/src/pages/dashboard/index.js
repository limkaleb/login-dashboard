import React, { useState, useEffect } from 'react';
import { AppBar, Typography, CircularProgress, Button, Box, Toolbar } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { FaRegListAlt } from 'react-icons/fa';
import * as api from '../../api';
import useStyles from './styles'
import DataList from '../../components/DataList'

const DashBoard = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [active, setActive] = useState(0);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.getUsers();
        console.log('resultt: ', data);
        setData(data.users);
        setTotal(data.users.length);
        setActive(data.total_active_today);
        setAverage(data.total_active_7_days);
      } catch (error) {
        console.log(error.message);
      }
      setIsLoading(false);
    };
    getData()
  }, []);

  const renderStats = () => {
    return (
      <Box style={{ padding: '20px 20px' }}>
        <Typography>
          Total Users: {total} 
        </Typography>
        <Typography>
          Active Users Today: {active}
        </Typography>
        <Typography>
          Active Users For 7 days: {average}
        </Typography>
        <DataList list={data} />
      </Box>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <FaRegListAlt size="2em" style={{ marginRight: '20px' }} />
          <Typography variant="h4" style={{ flex: 1 }}>
            Dashboard
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
      {isLoading ?
        <CircularProgress /> : renderStats()}
    </Box>
  );
}

export default DashBoard;