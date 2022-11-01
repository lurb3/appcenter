import React from 'react';
import { TextField  } from '@mui/material';
import './login.scss';

const Login = () => {
  return (
    <div className='formWrapper'>
      <TextField id="outlined-basic" label="Email" variant="outlined" />
      <TextField id="outlined-basic" label="Password" variant="outlined" type='password' />
    </div>
  )
}

export default Login;