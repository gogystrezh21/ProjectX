import React, { useState, useContext } from "react";
import { Container, Button, Form, Modal } from "react-bootstrap";
import { useHttp } from "../hooks/http.hook";
import { LoginContext } from '../context/LoginContext';
import { useParams } from 'react-router';


export const CollectionCard = ({ collection }) => {
  const { loading, request } = useHttp();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const logining = useContext(LoginContext);
  const [itemName, setItem] = useState('');
  const collectionId = useParams().id;

  const clickHandler = async event => {
    try {
      const data = await request(`/api/collection/${collectionId}/createItem`, 'POST', {itemName}, {
        Authorization: `Bearer ${logining.token}`
      })
      console.log(data);
    } catch (e) {}
    }  

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
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  onChange={(e) => setItem(e.target.value)} 
                  type="email"
                  placeholder="Item Name"
                  autoFocus
                />
              </Form.Group>
              {/* <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group> */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button
            
             variant="success" 
             onClick={clickHandler}>
              Create Item
            </Button>
          </Modal.Footer>
        </Modal>
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
    </Container>
  );
};
