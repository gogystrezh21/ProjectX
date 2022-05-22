import React, { useState, useMemo } from "react";
import { Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import deleteLogo from "../assets/delete.png";
import editLogo from "../assets/edit.png";
import { EditItemModal } from "./EditItemModal";

export const ItemsList = ({ items, sortName, directionSort,onDeleteItem,onEditItem }) => {
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
    setCurrentItemId('');
  };
  const itemForEdit = useMemo(
    () => items.find((items) => items._id === сurrentItemId),
    [items, сurrentItemId]
  );

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
                    onClick={() => onDeleteItem(item._id)}
                    disabled={loading}
                  />
                </td>
                <td>
                <img
                    src={editLogo}
                    alt="deleteLogo"
                    type="button"
                    size="sm"
                    onClick={() => handleShow(item._id)}
                    disabled={loading}
                  />
                </td>
              </tr>
            );
          })}         
        </tbody>
        {itemForEdit && (
          <EditItemModal
            itemForEdit={itemForEdit}
            onEditItem={onEditItem}
            loading={loading}
            isShow={show}
            onClose={handleClose}
          />
        )}
      </Table>
    </Container>
  );
};
