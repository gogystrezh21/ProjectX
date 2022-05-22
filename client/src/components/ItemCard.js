import React, {useState} from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useHttp } from "../hooks/http.hook";

export const ItemCard = ({ item, onCreateItemComment}) => {
  const [commentText, setComment] = useState("");
  const { loading } = useHttp();
  return (
    <Container className="mt-3 w-100">
      <h2>
        Item name:<strong>"{item.itemName}"</strong>
      </h2>
      <p>
        Likes: <strong>{}</strong>
      </p>
      <p>
        Item Id: <strong>{item._id}</strong>
      </p>
      <p>
        Tags: <strong>{}</strong>
      </p>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control 
          className="mb-3 w-100 app_input"
          type="email" 
          placeholder="Add comment" 
          as="textarea" 
          // value={comment}
          onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>
        <Button
          type="submit"
          className="mb-3 w-100 app_button"
          onClick={() => onCreateItemComment(commentText)}>
          Add your comment!
        </Button>
      </Form>
    </Container>
  );
};
