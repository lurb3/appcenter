import React from 'react';
import { getJwt } from 'utils/jwt';
const { Outlet, Navigate } = require('react-router-dom');

const ProtectedRoutes = () => {
  const isAuth = getJwt();
  return isAuth ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectedRoutes;
