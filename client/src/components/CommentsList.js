import React from "react";
import { Container, Card } from "react-bootstrap";
// import { useHttp } from "../hooks/http.hook";
import Moment from "react-moment";

export const CommentsList = ({ comments }) => {
  // const { loading } = useHttp();
  if (!comments.length) {
    return <p className="text-center">No comments!</p>;
  }

  return (
    <Container>
      {comments.map((comment, index) => {
        return (
          <Card className="mb-2">
            <blockquote className="m-2">
              <p>{comment.commentText}</p>
              <footer>
                Posted by{" "} at{" "}
                <cite>
                  <Moment format="YYYY-MM-DD HH:MM">{comment.date}</Moment>
                </cite>
              </footer>
            </blockquote>
          </Card>
        );
      })}
    </Container>
  );
};
