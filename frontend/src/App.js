import React from 'react';
import history from 'utils/history';
import {
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Login from 'pages/Login/Login';
import Signup from 'pages/Signup/Signup';
import ShoppingList from 'pages/ShoppingList/ShoppingList';
import ProductList from 'pages/ProductList/ProductList';
import ProtectedRoutes from 'ProtectedRoutes';
import SideNavMenu from 'components/SideNavMenu/SideNavMenu';

const App = () => {
  return (
    <div className='appWrapper'>
      <HistoryRouter history={history}>
        <SideNavMenu />
        <Divider />
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route path="/signup" element={ <Signup /> } />
          <Route element={ <ProtectedRoutes /> } >
            <Route path="/shoppinglist" element={ <ShoppingList /> } />
            <Route path="/shoppinglist/:shoppingListID" element={ <ProductList /> } />
          </Route>
        </Routes>
      </HistoryRouter>
    </div>
  );
};

export default App;
