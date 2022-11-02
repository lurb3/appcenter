import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Login from 'pages/Login/Login';
import Signup from 'pages/Signup/Signup';
import ShoppingList from 'pages/ShoppingList/ShoppingList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/shoppinglist" element={ <ShoppingList /> } />
      </Routes>
    </Router>
  );
};

export default App;
