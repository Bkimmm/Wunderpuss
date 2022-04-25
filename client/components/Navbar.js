import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clientSignout } from '../actions/actions';
import octopus from '../assets/octopus.png';

function NavBar({ loggedIn, clientSignout }) {
  const navigate = useNavigate();
  const handleSignout = () => {
    localStorage.clear();
    clientSignout();
    navigate('/');
  };
  const actions = () => {
    if (!loggedIn) {
      return (
        <>
          <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
            <Button color='inherit'>Login</Button>
          </Link>
          <Link to='/signup' style={{ textDecoration: 'none', color: 'white' }}>
            <Button color='inherit'>Signup</Button>
          </Link>
        </>
      );
    } else {
      return (
        <Button color='inherit' onClick={handleSignout}>
          Signout
        </Button>
      );
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          ></IconButton>

          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Link
              to='/dashboard'
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={octopus}
                  style={{ width: '35px', marginRight: '5px' }}
                />{' '}
                Wunderpus{' '}
              </Box>
            </Link>
          </Typography>

          {actions()}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
const mapStateToProps = ({ loginStatus }) => {
  return loginStatus;
};

export default connect(mapStateToProps, { clientSignout })(NavBar);
