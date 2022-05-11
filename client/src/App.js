import React from "react";
import { useRoutes } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { useLogin } from "./hooks/login.hook";
import { LoginContext } from "./context/LoginContext";
import { NavbarMenu } from "./components/Navbar";
import { Loader } from "./components/Loader";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { token, login, ready, logout, userId, isAuthenticated } = useLogin();
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <LoginContext.Provider
      value={{ token, login, logout, userId, isAuthenticated }}
    >
      <Router>
        <NavbarMenu />
        {routes}
      </Router>
    </LoginContext.Provider>
  );
}
export default App;
