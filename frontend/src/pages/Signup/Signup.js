import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiUtil from 'utils/api';
import { TextField, Button, Grid } from '@mui/material';
import { ClipLoader } from 'react-spinners';
import history from 'utils/history';
import './signup.scss';

const Signup = () => {
  const [ userName, setUserName ] = useState('');
  const [ userEmail, setUserEmail ] = useState('');
  const [ userPassword, setUserPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await apiUtil().post('/user', { name: userName, email: userEmail, password: userPassword });
    if (data.status === 200) history.push('/');
    setLoading(false);
  };

  return (
    <div className='signupWrapper'>
      <h1 className='colorWhite'>Create new account page</h1>
      <div className='formWrapper'>
        <form className='formFields' onSubmit={handleSubmit}>
          <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(e) => setUserName(e.target.value)} />
          <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setUserEmail(e.target.value)} />
          <TextField id="outlined-basic" label="Password" variant="outlined" type='password' onChange={(e) => setUserPassword(e.target.value)} />
          <Button disabled={loading} variant="contained" type='submit'>
            Signup
          </Button>
          { loading && (
            <Grid container justifyContent='center'>
              <ClipLoader color="#36d7b7" />
            </Grid>
          )}
          <Link className='loginLink' to="/"> Login</Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
