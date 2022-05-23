import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export const EditItemModal = ({
  isShow,
  onClose,
  onEditItem,
  itemForEdit,
}) => {
  const [itemName, setItem] = useState(
    itemForEdit.itemName
  );

  return (
    <Modal show={isShow} onHide={onClose} >
      <Modal.Header closeButton className="app_input">
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body className="app_container">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
            value={itemName}
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
        <Button
          className="app_button"
          onClick={() =>
            onEditItem(itemForEdit._id, {
              itemName
            })
          }
        >
          Edit Item
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
