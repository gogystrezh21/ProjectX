import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button} from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useHttp } from "../hooks/http.hook";

export const ItemsList = ({items}) => {
  // const [itemName] = useState("");
  // const { loading } = useHttp();
  // if (!items.length) {
  //   return <p>No items</p>;
  // }

  return (
        <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>№</th>
            <th>Item name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                    {item.itemName}
                </td>
                <td >
                  <Button
                    variant="btn btn-danger" 
                    size="sm"
                    className="w-100"
                    // onClick={registerHandler}
                    // disabled={loading}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
     );
};
