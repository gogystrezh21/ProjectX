import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { LoginContext } from "../context/LoginContext";
import { Loader } from "../components/Loader";
import { CollectionCard } from "../components/CollectionCard";

export const DetailCollectionPage = () => {
  const { token } = useContext(LoginContext);
  const { request, loading } = useHttp();
  const [collection, setCollection] = useState(null);
  const collectionId = useParams().id;

  const getCollection = useCallback(async () => {
    try {
      const fetched = await request(`/api/collection/${collectionId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setCollection(fetched);
    } catch (e) {}
  }, [token, collectionId, request]);

  useEffect(() => {
    getCollection();
  }, [getCollection]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && collection && <CollectionCard collection={collection} />}</>;
};
