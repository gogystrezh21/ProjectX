import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useHttp } from "../hooks/http.hook";
import { CreateCollectionItemModal } from "../components/CreateCollectionItemModal";
import ReactMarkdown from 'react-markdown';

export const CollectionCard = ({ collection, onCreateItem}) => {
  const { loading } = useHttp();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
 
  return (
    <Container className="mt-3 w-50">
      <h2>
        Collection: <strong>"{collection.collectionName}"</strong>
      </h2>
      <p>
        Views: {collection.clicks}
      </p>
      <p>Description:
      <ReactMarkdown children={collection.collectionDescription}
      />
      </p>
      <p>
        Topic: {collection.collectionTopic}
      </p>
      <Button
        variant="btn btn-success"
        className="mb-2 w-100"
        onClick={handleShow}
        disabled={loading}
      >
        Add Item
      </Button>
      <CreateCollectionItemModal
        onCreateItem={onCreateItem}
        loading={loading}
        isShow={show}
        onClose={handleClose}
      />
      </Container>
  );
};
