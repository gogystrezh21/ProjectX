import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Nav,
  Form,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const RegistrationPage = () => {
  const message = useMessage();
  const { loading, request, cleaner, error } = useHttp();
  const history = useNavigate();
  const [form, setForm] = useState({
    username: "",
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
      <Container className="mt-3 w-50">
        <h2 className="mb-3 text-center">Registration Form</h2>
        <Form>
          <Form.Group className="mb-3 w-100 center mx-auto">
            <Form.Control
              placeholder="Username"
              id="username"
              type="text"
              name="username"
              onChange={changeHandler}
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
            />
            <Form.Text className="text-muted">Minimum 4 symbols</Form.Text>
          </Form.Group>
        </Form>

        <Button
          variant="btn btn-primary"
          className="mb-2 w-100 center mx-auto"
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
