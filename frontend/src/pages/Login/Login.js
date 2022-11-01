import React, { useState } from 'react';
import apiUtil from 'utils/api';
import { setJwt } from 'utils/jwt';
import { TextField, Button } from '@mui/material';
import './login.scss';

const Login = () => {
  const [ userName, setUserName ] = useState('');
  const [ userEmail, setUserEmail ] = useState('');
  const [ userPassword, setUserPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    apiUtil().post('/user/login', { name: userName, email: userEmail, password: userPassword })
      .then((res) => {
        if (res.data.token) setJwt(res.data.token);
      });
  };

  return (
    <div className='formWrapper'>
      <form className='formFields' onSubmit={handleSubmit}>
        <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(e) => setUserName(e.target.value)} />
        <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setUserEmail(e.target.value)} />
        <TextField id="outlined-basic" label="Password" variant="outlined" type='password' onChange={(e) => setUserPassword(e.target.value)} />
        <Button variant="contained">Signup</Button>
        <Button variant="contained" type='submit'>Login</Button>
      </form>
    </div>
  );
};

export default Login;
