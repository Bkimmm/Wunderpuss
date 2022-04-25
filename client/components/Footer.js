import React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      sx={{ mt: 15, mb: 4 }}
    >
      {'Copyright © '}
      {/* <Link color='inherit' to='#'> */}
      <a
        href='https://github.com/Team-Wunderpuss-2-0/Wunderpuss'
        style={{ textDecoration: 'none' }}
        target='_blank'
      >
        Wunderpus{' '}
      </a>
      {/* </Link>{' '} */}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Footer;
