import React from "react";
import { Container, Button } from "react-bootstrap";
import { useHttp } from "../hooks/http.hook";

export const CollectionCard = ({ collection }) => {
  const { loading } = useHttp();
  return (
    <Container className="mt-3 w-50">
      <h2>
        Collection:<strong>"{collection.collectionName}"</strong>
      </h2>
      <p>
        Views: <strong>{collection.clicks}</strong>
      </p>
      <Container className="d-flex justify-content-between">
        <Button
          variant="btn btn-success"
          className="mb-2 w-30"
          // onClick={registerHandler}
          disabled={loading}
        >
          Add Item
        </Button>
        <Button
          variant="btn btn-primary"
          className="mb-2 w-30"
          // onClick={registerHandler}
          disabled={loading}
        >
          Edit Collection
        </Button>
        <Button
          variant="btn btn-danger"
          className="mb-2 w-30"
          // onClick={registerHandler}
          disabled={loading}
        >
          Delete Collection
        </Button>
      </Container>
    </Container>
  );
};
