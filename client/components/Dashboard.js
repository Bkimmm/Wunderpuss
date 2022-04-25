import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CardApplication from './CardApplication';
import { Container, Button, Box, Typography } from '@mui/material';
import Searching from '../assets/searching.png';

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const getApplications = () => {
    fetch(`/api/applications/${localStorage.getItem('userId')}`)
      .then((data) => data.json())
      .then((res) => setApplications(res));
  };
  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      navigate('/');
    }
    getApplications();
  }, []);
  const deleteApplication = (appId) => {
    fetch(`/api/application/${appId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        getApplications();
      })
      .catch((err) => console.log(err));
  };

  const updateProgress = (appId, data) => {
    fetch(`/api/application/${appId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log('data', response);
        getApplications();
      })
      .catch((err) => console.log(err));
  };

  const content = () => {
    if (applications.length > 0) {
      return applications.map((app) => {
        return (
          <CardApplication
            {...app}
            key={app._id}
            deleteApp={deleteApplication}
            updateApp={updateProgress}
          />
        );
      });
    } else {
      return (
        <Box
          sx={{
            justifyContent: 'center',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 10,
          }}
        >
          <img src={Searching} style={{ maxWidth: '300px' }} />
          <Typography variant='h6' color='text.secondary'>
            Looks like you don't have any applications...
          </Typography>
        </Box>
      );
    }
  };

  return (
    <Container component='main' maxWidth='lg' sx={{ mt: 5 }}>
      <Typography variant='h3' color='text.primary' sx={{ mb: 5 }}>
        Welcome to your dashboard!
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link to='/jobs' style={{ textDecoration: 'none' }}>
          <Button variant='text' sx={{ mr: 5 }}>
            View Job Postings
          </Button>
        </Link>
        <Link to='/applications' style={{ textDecoration: 'none' }}>
          <Button variant='outlined'>Start application</Button>
        </Link>
      </Box>

      {content()}
    </Container>
  );
}

export default Dashboard;
