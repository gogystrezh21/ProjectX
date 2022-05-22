import React, {useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import deleteLogo from "../assets/delete.png";
import editLogo from "../assets/edit.png";
import { EditCollectionModal } from "./EditCollectionModal";

export const CollectionList = ({
  collections,
  onDeleteCollection,
  onEditCollection,
}) => {
  const { loading} = useHttp();
  const [show, setShow] = useState(false);
  const [сurrentCollectionId, setCurrentCollectionId] = useState("");
  const handleShow = (id) => {
    setShow(true);
    setCurrentCollectionId(id);
  };
  const handleClose = () => {
    setShow(false);
    setCurrentCollectionId('');
  };
  const collectionForEdit = useMemo(
    () => collections.find((collection) => collection._id === сurrentCollectionId),
    [collections, сurrentCollectionId]
  );

  if (!collections.length) {
    return <h1 className="text-center mt-4">Collection list is Empty!</h1>;
  }

  return (
    <Container className="mt-3 ">
      <h2 className="text-center mb-3">My Collections</h2>
      <Button
        as={Link}
        className="mb-3 w-100 app_button"
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
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {collections.map((collection, index) => {
            return (
              <tr key={collection._id}>
                <td>{index + 1}</td>
                <td>
                  <Link
                    to={`/detail/${collection._id}`}
                    className="text-decoration-none text-dark"
                  >
                    {collection.collectionName}
                  </Link>
                </td>
                <td>
                  <img
                    src={deleteLogo}
                    alt="deleteLogo"
                    type="button"
                    size="sm"
                    onClick={() => onDeleteCollection(collection._id)}
                    disabled={loading}
                  />
                </td>
                <td>
                  <img
                    src={editLogo}
                    alt="deleteLogo"
                    type="button"
                    size="sm"
                    onClick={() => handleShow(collection._id)}
                    disabled={loading}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
        {collectionForEdit && (
          <EditCollectionModal
            collectionForEdit={collectionForEdit}
            onEditCollection={onEditCollection}
            loading={loading}
            isShow={show}
            onClose={handleClose}
          />
        )}
      </Table>
    </Container>
  );
};
