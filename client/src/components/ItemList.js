import React, { useState } from "react";
import { Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import deleteLogo from "../assets/delete.png";
import editLogo from "../assets/edit.png";

export const ItemsList = ({ items, sortName, directionSort }) => {
  const [slotName, setSlotName] = useState("");
  const { loading } = useHttp();
  if (!items.length) {
    return <h1 className="text-center mt-4">No Items!</h1>;
  }

  const Sorting = () => {
    return directionSort ? (
      <span className=" px-1 my-auto">(Z-A)</span>
    ) : (
      <span className="px-1 my-auto">(A-Z)</span>
    );
  };

  const slotSortName = (sorted) => {
    sortName(sorted);
    setSlotName(sorted);
  };

  return (
    <Container className="w-100 mx-auto overflow-auto">
      <Table striped bordered hover size="sm" className="text-center" >
        <thead>
          <tr>
            <th>№</th>
            <th
              role="button"
              onClick={() => {
                slotSortName("itemName");
              }}
            >
              Item name {slotName === "itemName" ? <Sorting /> : null}{" "}
            </th>
            <th>Tags</th>
            <th
              role="button"
              onClick={() => {
                slotSortName("_id");
              }}
            >
              Item Id {slotName === "_id" ? <Sorting /> : null}{" "}
            </th>
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
                  <Link
                    to={`/detail/${item.collectionId}/${item._id}`}
                    className="text-decoration-none text-dark"
                  >
                    {item.itemName}
                  </Link>
                </td>
                <td></td>
                <td>
                  <Link
                    to={`/detail/${item.collectionId}/${item._id}`}
                    className="text-decoration-none text-dark"
                  >
                    {item._id}
                  </Link>
                </td>
                <td>
                  <img
                    src={deleteLogo}
                    alt="deleteLogo"
                    type="button"
                    size="sm"
                    // onClick={() => deleteCollection(collection._id)}
                    disabled={loading}
                  />
                </td>
                <td>
                  <img
                    src={editLogo}
                    alt="deleteLogo"
                    type="button"
                    size="sm"
                    // onClick={() => deleteCollection(collection._id)}
                    disabled={loading}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};
