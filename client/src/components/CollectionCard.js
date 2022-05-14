import React, { useState} from "react";
import { Container, Button} from "react-bootstrap";
import { useHttp } from "../hooks/http.hook";
import {CreateCollectionItemModal} from '../components/CreateCollectionItemModal'


export const CollectionCard = ({ collection, onCreateItem }) => {
  const { loading } = useHttp();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <Container className="mt-3 w-50">
      <h2>
        Collection:<strong>"{collection.collectionName}"</strong>
      </h2>
      <p>
        Views: <strong>{collection.clicks}</strong>
      </p>
      <p>
        Items: <strong>{collection.clicks}</strong>
      </p>
      <Container className="d-flex justify-content-between">
        <Button
          variant="btn btn-success"
          className="mb-2 w-30"
          onClick={handleShow}
          disabled={loading}
        >
          Add Item
        </Button>
        <Button
          variant="btn btn-primary"
          className="mb-2 w-30"
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
      <CreateCollectionItemModal onCreateItem={onCreateItem} loading={loading} isShow={show} onClose={handleClose}/>
    </Container>
  );
};

