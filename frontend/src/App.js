import React, { useState, useEffect } from 'react';
import history from 'utils/history';
import {
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Login from 'pages/Login/Login';
import Signup from 'pages/Signup/Signup';
import ShoppingList from 'pages/ShoppingList/ShoppingList';
import ProductList from 'pages/ProductList/ProductList';
import ProtectedRoutes from 'ProtectedRoutes';
import SideNavMenu from 'components/SideNavMenu/SideNavMenu';
import Chat from 'pages/Chat/Chat';
import Social from 'pages/Social/Social';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:4000');

const App = () => {
  return (
    <Provider store={store}>
      <div className='appWrapper'>
        <HistoryRouter history={history}>
          <Routes>
            <Route path="/" element={ <Login /> } />
            <Route path="/signup" element={ <Signup /> } />
          </Routes>
          <>
            <SideNavMenu />
            <Routes>
              <Route element={ <ProtectedRoutes /> } >
                <Route path="/shoppinglist" element={ <ShoppingList /> } />
                <Route path="/shoppinglist/:shoppingListID" element={ <ProductList /> } />
                <Route path="/chat" element={ <Chat socket={socket} /> } />
                <Route path="/social" element={ <Social /> } />
              </Route>
            </Routes>
          </>
        </HistoryRouter>
      </div>
    </Provider>
  );
};

export default App;
