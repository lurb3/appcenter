import React, { useEffect, useState } from 'react';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Link } from 'react-router-dom';
import apiUtil from 'utils/api';
import { getJwt, setJwt } from 'utils/jwt';
import { TextField, Button, Grid } from '@mui/material';
import history from 'utils/history';
import { ClipLoader } from 'react-spinners';
import './login.scss';

const schema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().required(),
});

const Login = () => {
  const [ loading, setLoading ] = useState(false);
  const [ loginError, setLoginError ] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setLoading(true);
    const response = await apiUtil().post('/user/login', data);

    setLoading(false);

    if (response.data.token) setJwt(response.data.token);
    if (response.status !== 200) {
      setLoginError(response?.data?.message || 'Error loging in');
      return;
    }
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
        <form className='formFields' onSubmit={handleSubmit(onSubmit)}>
          <TextField
            style={{ marginBottom: '10px' }}
            id="outlined-basic"
            label="Email"
            variant="standard"
            error={Boolean(errors.email)}
            helperText={errors.email ? errors.email.message : ''}
            {...register('email')}
          />
          <TextField
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
          {loginError ? <span>{loginError}</span> : null}
          <Link className='signupLink' to="/signup">Create new account</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
