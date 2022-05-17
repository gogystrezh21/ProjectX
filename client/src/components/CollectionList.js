import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";

export const CollectionList = ({ collections }) => {
  const { loading } = useHttp();
  if (!collections.length) {
    return <p>Collection list is Empty!</p>;
  }

    return (
    <Container className="mt-3">
      <h2 className="text-center mb-3">
        My Collections
      </h2>
      <Button
        as={Link}
        variant="btn btn-success"
        className="mb-3 w-100"
        // onClick={handleShow}
        disabled={loading}
        to="/generate"
      >
        Add Collection
      </Button>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>№</th>
            <th className="w-50">Collection name</th>
            <th>Delete Collection</th>
            <th>Edit Collecton</th>
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
                <td>
                  <Button
                    className="w-100"
                    variant="btn btn-danger" 
                    size="sm"
                    // onClick={registerHandler}
                    disabled={loading}
                  >
                    Delete
                  </Button>
                  
                </td>
                <td>
                <Button
                    className="w-100"
                    variant="btn btn-primary" 
                    size="sm"
                    // onClick={registerHandler}
                    disabled={loading}
                  >
                    Edit Collection
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
