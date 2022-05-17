import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { LoginContext } from "../context/LoginContext";
import { Loader } from "../components/Loader";
import { ItemCard } from "../components/ItemCard";

export const DetailItemPage = () => {
  const { token } = useContext(LoginContext);
  const { request, loading } = useHttp();
  const [item, setItem] = useState('');
  
  const { id: collectionId,itemId } = useParams();
  
  const getItem = useCallback(async () => {
        try {
      const fetched = await request(`/api/collection/${collectionId}/${itemId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setItem(fetched);
    } catch (e) {
    }
  }, [token,collectionId,itemId, request]);

 

  useEffect(() => {
    getItem();
  }, [getItem]);

  if (loading) {
    return <Loader />;
  }

  if (!item) {
    return <p>Item is not exsist!</p>;
  }
 
  return <>{<ItemCard item={item} />}</>;
};
