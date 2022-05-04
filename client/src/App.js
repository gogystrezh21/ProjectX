import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useRoutes} from './routes'
import {BrowserRouter as Router} from 'react-router-dom'
import {useLogin} from './hooks/login.hook'
import { LoginContext } from './context/LoginContext';


function App() {
  const {token, login, logout, userId} = useLogin()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  return (
    <LoginContext.Provider value = {{token, login, logout, userId, isAuthenticated}}>
      <Router>
            <div>
          <h1>{routes}</h1>
        </div>
        </Router>
    </LoginContext.Provider>
    
  );
}

export default App;
