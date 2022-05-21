import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export const CreateCollectionItemModal = ({isShow, onCreateItem, onClose}) => {
  const [itemName, setItem] = useState("");
  return (
  <Modal show={isShow} onHide={onClose} >
    <Modal.Header closeButton className="app_input">
      <Modal.Title>Add Item</Modal.Title>
    </Modal.Header >
    <Modal.Body className="app_container">
      <Form>
        <Form.Group className="mb-3" >
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            className="app_input"
            onChange={(e) => setItem(e.target.value)}
            placeholder="Item Name"
            autoFocus
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer className="app_container">
      <Button variant="danger" onClick={onClose}>
        Close
      </Button>
      <Button className="app_button" onClick={() => onCreateItem(itemName)}>
        Create Item
      </Button>
    </Modal.Footer>
  </Modal>
  );
};
