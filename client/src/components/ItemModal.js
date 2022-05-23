import React from "react";
import { Button, Modal } from "react-bootstrap";

export const ItemModal = ({
  isShow,
  onClose,
  itemForShow
}) => {

  return (
    <Modal show={isShow} onHide={onClose} >
      <Modal.Header closeButton className="app_input">
        <Modal.Title>{itemForShow.itemName}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="app_container">
      <p>
        Likes: <strong>{}</strong>
      </p>
      <p>
        Item Id: <strong>{itemForShow._id}</strong>
      </p>
      <p>
        Tags: <strong>{}</strong>
      </p>
      </Modal.Body>
      <Modal.Footer className="app_container">
        <Button variant="danger" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
