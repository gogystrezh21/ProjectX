import React, { useState, useMemo } from "react";
import { Table, Container } from "react-bootstrap";
import { useHttp } from "../hooks/http.hook";
import Moment from "react-moment";
import { ItemModal } from "./ItemModal";

export const LastItems = ({ items, sortName, directionSort }) => {
  const [slotName, setSlotName] = useState("");
  const [show, setShow] = useState(false);
  const { loading } = useHttp();
  const [сurrentItemId, setCurrentItemId] = useState("");
  const handleShow = (id) => {
    setShow(true);
    setCurrentItemId(id);
  };

  const handleClose = () => {
    setShow(false);
    setCurrentItemId("");
  };

  const itemForShow = useMemo(
    () => items.find((items) => items._id === сurrentItemId),
    [items, сurrentItemId]
  );

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
    <Container className="w-100 mx-auto overflow-auto mt-3">
      <h2 className="text-center">Last Items</h2>
      <Table striped bordered hover size="sm" className="text-center mt-3">
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
            <th
              role="button"
              onClick={() => {
                slotSortName("date");
              }}
            >
              Date {slotName === "date" ? <Sorting /> : null}{" "}
            </th>
            <th
              role="button"
              onClick={() => {
                slotSortName("_id");
              }}
            >
              Item Id {slotName === "_id" ? <Sorting /> : null}{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td onClick={() => handleShow(item._id)} role="button">
                  {item.itemName}
                </td>
                <td>
                  <Moment format="YYYY-MM-DD HH:MM">{item.date}</Moment>
                </td>
                <td onClick={() => handleShow(item._id)} role="button">
                  {item._id}
                </td>
              </tr>
            );
          })}
        </tbody>
        {itemForShow && (
          <ItemModal
            itemForShow={itemForShow}
            loading={loading}
            isShow={show}
            onClose={handleClose}
          />
        )}
      </Table>
    </Container>
  );
};
