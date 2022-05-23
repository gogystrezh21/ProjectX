import React, { useState, useCallback, useEffect } from "react";
import { Container } from "react-bootstrap";
import { LastItems } from "../components/LastItems";
import { TopCollections } from "../components/TopCollections";
import { useHttp } from "../hooks/http.hook";

export const HomePage = () => {
  const { request } = useHttp();
  const [items, setItems] = useState([]);
  const [directionSort, setDirectionSort] = useState(true);

  const getItems = useCallback(async () => {
    try {
      const fetched = await request(`/api/guest/lastItems`, "GET", null, {});
      setItems(fetched);
    } catch (e) {}
  }, [request]);

  const sortName = (sorted)=> {
    const itemsList = items.concat();
    let sortName;
    if (directionSort) { 
      sortName = itemsList.sort(
      (a, b) => {return a[sorted] > b[sorted] ? 1 : -1}
      );
     } else sortName = itemsList.reverse(
      (a, b) => {return a[sorted] > b[sorted] ? 1 : -1}
      );
    setItems(sortName);
    setDirectionSort(!directionSort);
  }

  useEffect(() => {
    getItems();
  }, [getItems]);
  console.log(items);

  return (
    <>
      <Container>
        <LastItems items={items} sortName={sortName} directionSort={directionSort}/>
        <TopCollections />
      </Container>
    </>
  );
};
