import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useHttp } from "../hooks/http.hook";


export const ItemCard = ({}) => {
  //  const { loading } = useHttp();
  
  return (
    <Container className="mt-3 w-50">
        <h2>
        Item name:<strong>"{}"</strong>
      </h2>
      <p>
        Views: <strong>{}</strong>
      </p>
      <Button
        variant="btn btn-success"
        className="mb-2 w-100"
        // onClick={handleShow}
        // disabled={loading}
      >
      </Button>
      </Container>
  );
};
