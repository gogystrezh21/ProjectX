import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useRoutes} from './routes'
import {BrowserRouter as Router} from 'react-router-dom'
import {useLogin} from './hooks/login.hook'
import { LoginContext } from './context/LoginContext';
import {NavbarMenu} from './components/Navbar'
// import {UnNavbarMenu} from './components/UnNavbar'


function App() {
  const {token, login, logout, userId, isAuthenticated} = useLogin()
  const routes = useRoutes(isAuthenticated);

  return (
    <LoginContext.Provider value = {{token, login, logout, userId, isAuthenticated}}>
      <Router>
      <NavbarMenu />
        {/* {isAuthenticated ? <NavbarMenu /> : <UnNavbarMenu />} */}
        {routes}
      </Router>
    </LoginContext.Provider>
  );
}

export default App;

