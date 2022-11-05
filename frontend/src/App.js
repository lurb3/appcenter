import React from 'react';
import history from 'utils/history';
import {
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';
import Login from 'pages/Login/Login';
import Signup from 'pages/Signup/Signup';
import ShoppingList from 'pages/ShoppingList/ShoppingList';
import ProductList from 'pages/ProductList/ProductList';
import ProtectedRoutes from 'ProtectedRoutes';

const App = () => {
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route element={ <ProtectedRoutes /> } >
          <Route path="/shoppinglist" element={ <ShoppingList /> } />
          <Route path="/shoppinglist/:shoppingListID" element={ <ProductList /> } />
        </Route>
      </Routes>
    </HistoryRouter>
  );
};

export default App;
