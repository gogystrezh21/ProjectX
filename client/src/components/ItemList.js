import React, {useState} from "react";
import { Table, Button, Container} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";

export const ItemsList = ({items, sortName, directionSort}) => {
  const [slotName, setSlotName]= useState("")
  const { loading } = useHttp();
  if (!items.length) {
    return <p className="text-center">No items!</p>;
  }

  const Sorting = () => {
    return (
      directionSort ? <span className=" px-1 my-auto" >(Z-A)</span> : <span className="px-1 my-auto" >(A-Z)</span>
    )
  }

  const slotSortName = (sorted) => {
    sortName(sorted)
    setSlotName(sorted)
  }

  return (
    <Container className="w-50 mx-auto">
        <Table bordered hover size="sm" className="align-items-center" >
        <thead >
          <tr >
            <th>№</th>
            <th role="button" className="" onClick={()=>{slotSortName('itemName')}}>Item name  {slotName === 'itemName' ? <Sorting/> : null} </th>
            <th>Tags</th>
            <th role="button" className="" onClick={()=>{slotSortName('_id')}}>Item Id {slotName === '_id' ? <Sorting/> : null} </th>
            <th>Delete</th>
            <th>Edit</th>
           </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/detail/${item.collectionId}/${item._id}`}>
                    {item.itemName}
                  </Link>
                </td>
                <td>

                </td>
                <td>
                  <Link to={`/detail/${item.collectionId}/${item._id}`}>
                    {item._id}
                  </Link>
                </td>

                <td>
                  <Button
                    variant="btn btn-danger"
                    size="sm"
                    className="w-100"
                    // onClick={registerHandler}
                    disabled={loading}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  <Button
                    variant="btn btn-primary"
                    size="sm"
                    className="w-100"
                    // onClick={registerHandler}
                    disabled={loading}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      </Container>
     );
};
