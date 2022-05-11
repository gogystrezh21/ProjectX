import React, { useContext, useEffect, useState } from "react";
import {
  FormControl,
  InputGroup,
  Container,
  Button,
  Nav,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const LoginPage = () => {
  const logining = useContext(LoginContext);
  const message = useMessage();
  const { loading, request, cleaner, error } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    cleaner();
  }, [error, message, cleaner]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      logining.login(data.token, data.userId);
      console.log(logining);
      console.log("Data", data);
      alert(data.message);
    } catch (e) {}
  };

  return (
    <>
      <Container className="mt-3 w-50">
        <h2 className="mb-3 text-center">Sign In</h2>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Email"
            id="email"
            type="text"
            name="email"
            onChange={changeHandler}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <FormControl
            placeholder="Password"
            id="password"
            type="password"
            name="password"
            onChange={changeHandler}
          />
        </InputGroup>

        <Button
          variant="btn btn-primary"
          className="mb-2 w-100 center mx-auto"
          onClick={loginHandler}
          disabled={loading}
        >
          Login
        </Button>
        <h6 className="mb-1 text-center">Already have an account?</h6>
        <Nav.Link
          as={Link}
          disabled={loading}
          to="/"
          className="mb-3 text-center"
        >
          Sign In
        </Nav.Link>
      </Container>
    </>
  );
};
