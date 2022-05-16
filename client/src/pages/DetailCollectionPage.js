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
    } catch (e) {}
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

  useEffect(() => {
    getCollection();
    getItems();
  }, [getCollection, getItems ]);
 

  if (loading) {
    return <Loader />;
  }

  if (!collection) {
    return <p>Collection is not exsist</p>;
  }

  return ( 
  <>
  <CollectionCard collection={collection} onCreateItem={handleCreateCollectionItem}/>
  <ItemsList items={items}/>
  </>
  );
};
