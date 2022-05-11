import React from "react";
import { Container } from "react-bootstrap";


export const CollectionCard = ({ collection })=> {
  return (
    <Container className="mt-3 w-50">
      <h2>Collection</h2>
      <p>Views: <strong>{collection.clicks}</strong></p>
    </Container>
  )
}