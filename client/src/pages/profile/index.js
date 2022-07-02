import React, { useState, useEffect } from 'react';
import {
  Box,
  Toolbar,
  AppBar,
  Typography,
  CircularProgress,
  Button,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import * as api from '../../api';
import Dialog from '../../components/CustomDialog'

const Profile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [name, setName] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.getSession();
        setData(data)
        setName(data.user_name)
      } catch (error) {
        console.log(error.message);
      }
      setIsLoading(false);
    };
    getData()
  }, [openDialog]);

  const handleEdit = async () => {
    const { data } = await api.updateUser(name);
    setName(data.user_name);
    setOpenDialog(false);
  }

  const renderEditDialog = () => {
    if (!openDialog) return null;
    return (
      <Dialog
        open={openDialog}
        value={name}
        handleClose={() => setOpenDialog(false)}
        handleSubmit={() => handleEdit(name)}
        onchange={(name) => setName(name)}
      />
    )
  }

  const renderUser = () => {
    return (
      <Box style={{ padding: '20px 20px' }}>
        <Typography variant="h6">
          {data?.email}
        </Typography>
        <Typography variant="h6">
          Welcome, {data?.user_name}!
        </Typography>
        <Button
          style={{ marginTop: '10px' }}
          color="primary"
          variant="contained"
          onClick={() => setOpenDialog(true)}
        >
          Edit Name
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <FaUser size="2em" style={{ marginRight: '20px' }} />
          <Typography variant="h4" style={{ flex: 1 }}>
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
      {renderEditDialog()}
    </Box>
  );
}

export default Profile;