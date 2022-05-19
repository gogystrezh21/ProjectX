import React from "react";
import { Table, Container} from "react-bootstrap";
// import { useHttp } from "../hooks/http.hook";
import Moment from 'react-moment';

export const CommentsList = ({comments}) => {
  // const { loading } = useHttp();
  if (!comments.length) {
    return <p className="text-center">No comments!</p>;
  }

  return (
    <Container className="w-50 mx-auto">
      
        <Table bordered hover size="sm" className="align-items-center" >
        <tbody>
          {comments.map((comment, index) => {
            return (
              <tr key={comment._id}>
                <td>
                  {comment.commentText}
                  <Moment format='YYYY/MM/DD'>{comment.date}</Moment>
                </td>
                {/* <td>
                  <Button
                    variant="btn btn-danger"
                    size="sm"
                    className="w-100"
                    // onClick={registerHandler}
                    disabled={loading}
                  >
                    Delete
                  </Button>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </Table>
      </Container>
     );
};
