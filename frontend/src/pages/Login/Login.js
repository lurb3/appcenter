import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateUser } from 'slices/userSlice';
import { joiResolver } from '@hookform/resolvers/joi';
import { TextField, Button, Grid } from '@mui/material';
import { getJwt, setJwt } from 'utils/jwt';
import apiUtil from 'utils/api';
import history from 'utils/history';
import { loginSchema } from 'utils/schemas/loginSchema';
import './login.scss';

const Login = () => {
  const [ loading, setLoading ] = useState(false);
  const [ loginError, setLoginError ] = useState('');
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(loginSchema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    const response = await apiUtil().post('/user/login', data);
    setLoading(false);
    if (response.data.token) setJwt(response.data.token);
    if (response.status !== 200) {
      setLoginError(response?.data?.message || 'Error loging in');
      return;
    }
    dispatch(updateUser(response.data.user));
    history.push('/shoppinglist');
  };


  return (
    <div className='loginWrapper'>
      <h1 className='colorWhite'>Login page</h1>
      <div className='formWrapper'>
        <form className='formFields' onSubmit={handleSubmit(onSubmit)}>
          <TextField
            disabled={loading}
            style={{ marginBottom: '10px' }}
            id="outlined-basic"
            label="Email"
            variant="standard"
            error={Boolean(errors.email)}
            helperText={errors.email ? errors.email.message : ''}
            {...register('email')}
          />
          <TextField
            disabled={loading}
            style={{ marginBottom: '10px' }}
            id="outlined-basic"
            label="Password"
            variant="standard"
            type='password'
            error={Boolean(errors.password)}
            helperText={errors.password ? errors.password.message : ''}
            {...register('password')}
          />
          { loading && (
            <Grid container justifyContent='center'>
              <ClipLoader color="#36d7b7" />
            </Grid>
          )}
          <Button disabled={loading} variant="contained" type='submit'>Login</Button>
          {loginError ? <span className='colorRed'>{loginError}</span> : null}
          <Link className='signupLink' to="/signup">Create new account</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
