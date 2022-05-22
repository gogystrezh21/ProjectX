import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export const EditCollectionModal = ({ isShow,onClose, onEditCollection,collectionForEdit} ) => {

  const [collectionName, setCollection] = useState(collectionForEdit.collectionName);
  const [collectionDescription, setCollectionDescription] = useState(collectionForEdit.collectionDescription);
  const [collectionTopic, setCollectionTopic] = useState(collectionForEdit.collectionTopic);

  return (
    <Modal show={isShow} onHide={onClose} >
      <Modal.Header closeButton className="app_input">
        <Modal.Title>Edit collection</Modal.Title>
      </Modal.Header>
      <Modal.Body className="app_container">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Collection Name</Form.Label>
            <Form.Control
              className="app_input"
              placeholder="Collection Name"
              id="collectionName"
              type="text"
              name="collectionName"
              value={collectionName}
              onChange={(e) => setCollection(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description with Markdown</Form.Label>
            <Form.Control
              type="text"
              id="collectionDescription"
              name="collectionDescription"
              as="textarea"
              placeholder="Description"
              className="app_input"
              value={collectionDescription}
              onChange={(e) => setCollectionDescription(e.target.value)}
              rows={3}
            />
          </Form.Group>
          <Form.Label>Select your collection topic</Form.Label>
          <Form.Select
            value={collectionTopic}
            onChange={(e) => setCollectionTopic(e.target.value)}
            className="app_input mb-3"
          >
            <option>Books (default)</option>
            <option>Signs</option>
            <option>Silverware</option>
          </Form.Select>
        </Form>
      </Modal.Body>
      <Modal.Footer className="app_container">
        <Button variant="danger" onClick={onClose}>
          Close
        </Button>
        <Button
          className="app_button"
          onClick={() =>
            onEditCollection(collectionForEdit._id, {
              collectionTopic,
              collectionName,
              collectionDescription,
            })
          }
        >
          Edit Collection
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
