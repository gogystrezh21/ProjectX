import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";

export const ItemsList = ({ items }) => {
  const { loading } = useHttp();
  if (!items.length) {
    return <p>No items</p>;
  }

  return (
    <Container className="mt-3 w-75">
      <Table striped bordered hover size="sm">
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
                  <Link to={`/detail/${collection._id}`}>
                    {collection.collectionName}
                  </Link>
                </td>
                <td >
                  <Button
                    variant="btn btn-danger" 
                    size="sm"
                    className="w-100"
                    // onClick={registerHandler}
                    disabled={loading}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};
