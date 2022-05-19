import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { LoginContext } from "../context/LoginContext";
import { Loader } from "../components/Loader";
import { CollectionCard } from "../components/CollectionCard";
import { ItemsList } from "../components/ItemList";

export const DetailCollectionPage = () => {
  const { token } = useContext(LoginContext);
  const { request, loading } = useHttp();
  const [collection, setCollection] = useState(null);
  const [directionSort, setDirectionSort] = useState(true);
  const [items, setItems] = useState([]);
  
  const { id: collectionId} = useParams();

  const getCollection = useCallback(async () => {
    try {
      const fetched = await request(`/api/collection/${collectionId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setCollection(fetched);
    } catch (e) {}
  }, [token, collectionId, request]);

  const handleCreateCollectionItem = async (itemName) => {
    try {
      const data = await request(`/api/collection/${collectionId}/createItem`, 'POST', {itemName}, {
        Authorization: `Bearer ${token}`
      })
      console.log(data);
      alert(data.message)
    } catch (e) {
    }
  } 

  const getItems = useCallback(async () => {
        try {
      const fetched = await request(`/api/collection/${collectionId}/allItems`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setItems(fetched);
    } catch (e) {
    }
  }, [token,collectionId, request]);

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
    getCollection();
    getItems();
  }, [getCollection, getItems ]);
 

  if (loading) {
    return <Loader />;
  }

  if (!collection) {
    return <h1 className="text-center mt-4">Collection is not exsist</h1>;
  }

  return ( 
  <>
  <CollectionCard collection={collection} onCreateItem={handleCreateCollectionItem}/>
  <ItemsList items={items} sortName={sortName} directionSort={directionSort}/>
  </>
  );
};
