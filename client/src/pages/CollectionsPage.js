import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import "bootstrap/dist/css/bootstrap.min.css";
import { LoginContext } from "../context/LoginContext";
import { Loader } from "../components/Loader";
import { CollectionList } from "../components/CollectionList";

export const CollectionsPage = () => {
  const [collections, setCollection] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(LoginContext);
  const fetchCollections = useCallback(async () => {
    try {
      const fetched = await request("/api/collection", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setCollection(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  if (loading) {
    return <Loader />;
  }

  return <>{<CollectionList collections={collections} />}</>;
};
