import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { LoginContext } from "../context/LoginContext";
import deleteLogo from "../assets/delete.png";

export const CollectionList = ({ collections }) => {
  const logining = useContext(LoginContext);
  const { loading, request } = useHttp();
  if (!collections.length) {
    return <p>Collection list is Empty!</p>;
  }

  const deleteCollection = async (id) => {
    try {
      console.log("hello");
      const data = await request(`/api/collection/${id}`, "DELETE", {
        Authorization: `Bearer ${logining.token}`,
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container className="mt-3">
      <h2 className="text-center mb-3">My Collections</h2>
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
      <Table striped bordered hover size="sm" className="text-center">
        <thead>
          <tr>
            <th>№</th>
            <th>Collection name</th>
            <th>Delete Collection</th>
            <th>Edit Collecton</th>
          </tr>
        </thead>
        <tbody >
          {collections.map((collection, index) => {
            return (
              <tr key={collection._id}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/detail/${collection._id}`}>
                    {collection.collectionName}
                  </Link>
                </td>
                <td className="w-10 h-10">
                  <div className="w-10 h-10">
                  <img
                    src={deleteLogo}
                    alt="deleteLogo"
                    className="w-10 h-10"
                    type="button"
                    size="sm"
                    onClick={() => deleteCollection(collection._id)}
                    disabled={loading}
                  />
                  </div >
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
