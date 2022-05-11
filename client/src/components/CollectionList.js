import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const CollectionList = ({ collections }) => {
  if (!collections.length) {
    return <p>Collection list is Empty!</p>;
  }

  return (
    <Container className="mt-3 w-75">
      <Table striped bordered hover size="sm" >
      <thead>
        <tr>
          <th>№</th>
          <th>Collection name</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {collections.map((collection, index) => {
          return (
            <tr key={collection._id}>
              <td>{index + 1}</td>
              <td> 
                <Link to={`/detail/${collection._id}`}>{collection.from}</Link>
              </td>
              <td>
                delete
              </td>
            </tr>
          );
        },)}
      </tbody>
    </Table>
    </Container>
    
  );
};
