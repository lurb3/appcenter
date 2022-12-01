import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from 'slices/userSlice';
import { getJwt } from 'utils/jwt';
import apiUtil from 'utils/api';
import history from 'utils/history';
const { Outlet, Navigate } = require('react-router-dom');



const ProtectedRoutes = () => {
  const isAuth = getJwt();
  const dispatch = useDispatch();

  const getUser = async () => {
    const response = await apiUtil().get('/user/getuser');
  
    if (response.data.user) {
      dispatch(updateUser(response.data.user));
    }
  }

  getUser();

  return isAuth ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectedRoutes;
