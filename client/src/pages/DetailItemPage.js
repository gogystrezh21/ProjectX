import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { LoginContext } from "../context/LoginContext";
import { Loader } from "../components/Loader";
import { ItemCard } from "../components/ItemCard";
import { CommentsList } from "../components/CommentsList";

export const DetailItemPage = () => {
  const { token } = useContext(LoginContext);
  const { request, loading } = useHttp();
  const [item, setItem] = useState('');
  const [comments, setComments] = useState([]);
  
  const { id: collectionId,itemId} = useParams();
  
  const getItem = useCallback(async () => {
        try {
      const fetched = await request(`/api/collection/${collectionId}/${itemId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setItem(fetched);
    } catch (e) {
    }
  }, [token,collectionId,itemId, request]);

  const handleCreateCollectionItemComment = async (commentText) => {
    try {
      const data = await request(`/api/collection/${collectionId}/${itemId}/createComment`, 'POST', {commentText}, {
        Authorization: `Bearer ${token}`
      })
      const fetched = await request(`/api/collection/${collectionId}/${itemId}/allComments`, "GET", null, {
        Authorization: `Bearer ${token}`});
      console.log(data);
      setComments(fetched);
      alert(data.message)
    } catch (e) {}
  }

  const getComments = useCallback(async () => {
    try {
  const fetched = await request(`/api/collection/${collectionId}/${itemId}/allComments`, "GET", null, {
    Authorization: `Bearer ${token}`,
  });
  setComments(fetched);
} catch (e) {
}
}, [token,collectionId,itemId, request]);

  useEffect(() => {
    getItem();
    getComments();
  }, [getItem, getComments]);

  if (loading) {
    return <Loader />;
  }

  if (!item) {
    return <h1 className="text-center mt-4">Item is not exsist!</h1>;
  }
 
  return ( 
    <>
    <ItemCard item={item} onCreateItemComment={handleCreateCollectionItemComment}/>
    <CommentsList comments={comments}/>
    </>
    );
};
