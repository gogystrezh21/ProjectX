import React, { useState } from "react";
import {
  Container,
  Button,
  Nav,
  Form,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";

export const RegistrationPage = () => {
  const { loading, request} = useHttp();
  const history = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });


  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      console.log("Data", data);
      alert(data.message);
      history("/login");
    } catch (e) {}
  };

  return (
    <>
      <Container className="mt-3 w-50 ">
        <h2 className="mb-3 text-center">Registration Form</h2>
        <Form>
          <Form.Group className="mb-3 w-100 center mx-auto ">
            <Form.Control
              placeholder="Username"
              id="username"
              type="text"
              name="username"
              onChange={changeHandler}
              className="app_input"
            />
          </Form.Group>
        </Form>

        <Form>
          <Form.Group className="mb-1">
            <Form.Control
              placeholder="Email"
              id="email"
              type="text"
              name="email"
              onChange={changeHandler}
              className="app_input"
            />
            <Form.Text className="text-muted">
              Please, include a valid email
            </Form.Text>
          </Form.Group>
        </Form>

        <Form>
          <Form.Group className="mb-1">
            <Form.Control
              placeholder="Password"
              id="password"
              type="password"
              name="password"
              onChange={changeHandler}
              className="app_input"
            />
            <Form.Text className="text-muted">Minimum 4 symbols</Form.Text>
          </Form.Group>
        </Form>

        <Button
          className="mb-2 w-100 center mx-auto app_button"
          onClick={registerHandler}
          disabled={loading}
        >
          Registration
        </Button>
        <h6 className="mb-0 text-center">Don't have an account?</h6>
        <Nav.Link
          as={Link}
          to="/login"
          disabled={loading}
          className="mb-3 text-center"
        >
          Sign Up
        </Nav.Link>
      </Container>
    </>
  );
};
