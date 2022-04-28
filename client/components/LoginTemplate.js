import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { clientLogin } from '../actions/actions';

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Wunderpuss
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function SignIn(props) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const CLIENT_ID =
    '901507829953-n3rc11mkp13gpibjrs355njeqpjdcthd.apps.googleusercontent.com';

  const login = () => {
    console.log(username, password);
    Axios.post('/api/auth/login', {
      username,
      password,
    })
      .then((data) => {
        props.clientLogin();
        localStorage.setItem('userId', data.data);
        navigate('/dashboard');
      })
      .catch((err) => setError(err));
  };

  const responseGoogle = (response) => {
    // console.log(response);
    // console.log(response.profileObj);
    const googleId = response.profileObj.googleId;
    const gmail = response.profileObj.email;
    // console.log(gmail);
    // console.log(googleId);
    Axios.post('/api/auth/oauth', {
      gmail,
      googleId,
    })
      .then((data) => {
        // console.log('response google promise chain');
        props.clientLogin();
        localStorage.setItem('userId', data.data);
        navigate('/dashboard');
      })
      .catch((err) => setError(err));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          {error}
          <Box component='form' noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              autoComplete='username'
              autoFocus
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {/* <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            /> */}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              //   onClick={login}
            >
              Sign In
            </Button>
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText='Login with your Google Account'
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='/signup' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps = ({ loginStatus }) => {
  console.log(loginStatus);
  return loginStatus;
};

export default connect(mapStateToProps, { clientLogin })(SignIn);
