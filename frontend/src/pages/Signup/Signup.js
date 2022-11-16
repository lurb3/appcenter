import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiUtil from 'utils/api';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { TextField, Button, Grid } from '@mui/material';
import { ClipLoader } from 'react-spinners';
import history from 'utils/history';
import { signupSchema } from 'utils/schemas/signupSchema';
import './signup.scss';

const Signup = () => {
  const [ loading, setLoading ] = useState(false);
  const [ signupError, setSignupError ] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(signupSchema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    const response = await apiUtil().post('/user', data);
    setLoading(false);
    if (response.status !== 200) {
      setSignupError(response?.data?.message || 'Error creating account');
      return;
    }
    history.push('/');
  };

  return (
    <div className='signupWrapper'>
      <h1 className='colorWhite'>Create new account page</h1>
      <div className='formWrapper'>
        <form className='formFields' onSubmit={handleSubmit(onSubmit)}>
          <TextField
            disabled={loading}
            style={{ marginBottom: '10px' }}
            id="outlined-basic"
            label="Name"
            variant="standard"
            error={Boolean(errors.name)}
            helperText={errors.name ? errors.name.message : ''}
            {...register('name')}
          />
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
          <Button disabled={loading} variant="contained" type='submit'>
            Signup
          </Button>
          {signupError ? <span className='colorRed'>{signupError}</span> : null}
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
