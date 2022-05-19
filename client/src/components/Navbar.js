import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import {
  Container,
  FormControl,
  NavDropdown,
  Button,
  Nav,
  Form,
  Navbar,
} from "react-bootstrap";

export const NavbarMenu = () => {
  const navigation = useNavigate();
  const { logout, isAuthenticated } = useContext(LoginContext);

  const guestLinks = [
    { url: "/login", text: "Login" },
    { url: "/registration", text: "Registration" },
  ];
  const userLinks = [
    { url: "/generate", text: "Create Collection" },
    { url: "/collections", text: "My Collections" },
    // { url: "/detail/:id", text: "Detail" },
  ];

  console.log(isAuthenticated);

  const links = isAuthenticated ? userLinks : guestLinks;

  const logoutHandler = (event) => {
    event.preventDefault();
    logout();
    navigation.push("/homepage");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/homepage">
          Collections
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto mx-2 my-2 my-lg-0"
            style={{ maxHeight: "200px" }}
            navbarScroll
          >
            {links.map((link, index) => (
              <Nav.Link key={index} as={Link} to={link.url}>
                {link.text}
              </Nav.Link>
            ))}
            {isAuthenticated && (
              <Nav.Link as={Link} to="/" onClick={logoutHandler}>
                Logout
              </Nav.Link>
            )}
            <NavDropdown title="Language" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">EN</NavDropdown.Item>
              <NavDropdown.Item href="#action4">PL</NavDropdown.Item>
            </NavDropdown>
            <Form className="d-flex align-items-center">
              <Form.Check type="switch" id="custom-switch" />
            </Form>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="btn btn-primary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
