import React from "react";
import { Spinner, Container} from "react-bootstrap";

export const Loader = () => (
  <Container className="mt-5"  >
    <Spinner animation="border" variant="dark" className="m-auto d-block"/>
  </Container>
);
