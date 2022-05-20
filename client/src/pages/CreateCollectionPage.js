import React, {useState, useContext} from 'react';
import {useHttp} from '../hooks/http.hook';
import {
  Container,
  Button,
  Form
} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import { LoginContext } from '../context/LoginContext';
import 'bootstrap/dist/css/bootstrap.min.css';


export const CreateCollectionPage = () => {
  const {request} = useHttp();
  const logining = useContext(LoginContext);
  const [collectionName, setCollection] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [collectionTopic, setCollectionTopic] = useState('');
  const history = useNavigate();
  const { loading } = useHttp();
  
  const clickHandler = async event => {
      try {
        const data = await request('/api/collection/generate', 'POST', {collectionName, collectionDescription, collectionTopic }, {
          Authorization: `Bearer ${logining.token}`
        })
        console.log(data);
        history(`/detail/${data.collection._id}`);
      } catch (e) {}
  }
 
  return (
    <Container className="mt-3 w-50">
      <h2 className="mb-3 text-center">Create your Collection</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
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

      <Button
        variant="btn btn-primary"
        className="mb-2 w-100"
        onChange={(e) => setCollection(e.target.value)}
        onClick={clickHandler}
        disabled={loading}
      >
        Create Collection
      </Button>
    </Container>
  );
}