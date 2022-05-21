import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export const EditCollectionModal = ({ isShow, onEditCollection, onClose }) => {
  
  const [collectionName, setCollection] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [collectionTopic, setCollectionTopic] = useState('')
  return (
    <Modal show={isShow} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit collection</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Collection Name</Form.Label>
            <Form.Control
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
              value={collectionDescription}
              onChange={(e) => setCollectionDescription(e.target.value)}
              rows={3}
            />
          </Form.Group>
          <Form.Label>Select your collection topic</Form.Label>
          <Form.Select className="mb-3" value={collectionTopic} onChange={(e) => setCollectionTopic(e.target.value)}>
          <option>Books (default)</option>
          <option>Signs</option>
          <option>Silverware</option>
        </Form.Select>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          Close
        </Button>
        <Button variant="success" onClick={() => onEditCollection()}>
          Edit Collection
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
