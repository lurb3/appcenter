import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiUtil from 'utils/api';
import { getJwt, setJwt } from 'utils/jwt';
import { TextField, Button, Grid } from '@mui/material';
import history from 'utils/history';
import { ClipLoader } from 'react-spinners';
import './login.scss';

const Login = () => {
  const [ loading, setLoading ] = useState(false);
  const [ userEmail, setUserEmail ] = useState('');
  const [ userPassword, setUserPassword ] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await apiUtil().post('/user/login', { email: userEmail, password: userPassword });
    if (response.data.token) setJwt(response.data.token);
    setLoading(false);
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
          { loading && (
            <Grid container justifyContent='center'>
              <ClipLoader color="#36d7b7" />
            </Grid>
          )}
          <Button disabled={loading} variant="contained" type='submit'>Login</Button>
          <Link className='signupLink' to="/signup">Create new account</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
