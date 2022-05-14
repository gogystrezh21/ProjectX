import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export const CreateCollectionItemModal = ({isShow, onCreateItem, onClose}) => {
  const [itemName, setItem] = useState("");
  return (
  <Modal show={isShow} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Add Item</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            onChange={(e) => setItem(e.target.value)}
            type="email"
            placeholder="Item Name"
            autoFocus
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="danger" onClick={onClose}>
        Close
      </Button>
      <Button variant="success" onClick={() => onCreateItem(itemName)}>
        Create Item
      </Button>
    </Modal.Footer>
  </Modal>
  );
};
