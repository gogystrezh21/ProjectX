import React from 'react';
import {Link} from 'react-router-dom'
import {Container, FormControl , NavDropdown, Button,Nav, Form, Navbar } from 'react-bootstrap';


export const UnNavbarMenu = () => {

 
  return ( 
    <Navbar bg="dark" variant="dark" expand="lg">
    <Container fluid>
    <Navbar.Brand as={Link} to="/">Books Collections</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="ms-auto mx-2 my-2 my-lg-0"
        style={{ maxHeight: '200px' }}
        navbarScroll
      >
        <Nav.Link as={Link} to="/create">Create</Nav.Link>
        <Nav.Link as={Link} to="/links">Links</Nav.Link>
        <NavDropdown title="Language" id="navbarScrollingDropdown">
          <NavDropdown.Item href="#action3">EN</NavDropdown.Item>
          <NavDropdown.Item href="#action4">PL</NavDropdown.Item>
        </NavDropdown>
        <Form className="d-flex align-items-center">
        <Form.Check 
          type="switch"
          id="custom-switch"
        />
      </Form>
      </Nav>
      <Form className="d-flex" >
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
  )
}

