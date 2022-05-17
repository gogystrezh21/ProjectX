import React from "react";
import { Container, Button } from "react-bootstrap";
import { useHttp } from "../hooks/http.hook";

export const ItemCard = ({ item }) => {
  const { loading } = useHttp();

  return (
    <Container className="mt-3 w-50">
      <h2>
        Item name:<strong>"{item.itemName}"</strong>
      </h2>
      <p>
        Likes: <strong>{}</strong>
      </p>
      <Button
        variant="btn btn-danger"
        className="mb-2 w-100"
        // onClick={handleShow}
        disabled={loading}
      >
        Delete Item
      </Button>
    </Container>
  );
};
