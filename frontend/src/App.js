import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/Login/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Login /> }>
        </Route>
      </Routes>
    </Router>
  )
}
export default App;
