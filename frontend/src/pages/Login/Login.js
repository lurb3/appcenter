import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiUtil from 'utils/api';
import { getJwt, setJwt } from 'utils/jwt';
import { TextField, Button } from '@mui/material';
import history from 'utils/history';
import './login.scss';

const Login = () => {
  const [ userEmail, setUserEmail ] = useState('');
  const [ userPassword, setUserPassword ] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await apiUtil().post('/user/login', { email: userEmail, password: userPassword });
    if (response.token) setJwt(response.token);
    history.push('/shoppinglist');
  };

  useEffect(() => {
    const token = getJwt();
    if (token) history.push('/shoppinglist');
  }, []);

  return (
    <div className='loginWrapper'>
      <h1 className='colorWhite'>Login page</h1>
      <div className='formWrapper'>
        <form className='formFields' onSubmit={handleSubmit}>
          <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setUserEmail(e.target.value)} />
          <TextField id="outlined-basic" label="Password" variant="outlined" type='password' onChange={(e) => setUserPassword(e.target.value)} />
          <Button variant="contained" type='submit'>Login</Button>
          <Link className='signupLink' to="/signup">Create new account</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
