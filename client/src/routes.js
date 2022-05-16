import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CollectionsPage } from "./pages/CollectionsPage";
import { CreateCollectionPage } from "./pages/CreateCollectionPage";
import { DetailCollectionPage } from "./pages/DetailCollectionPage";
import { DetailItemPage } from "./pages/DetailItemPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { LoginPage } from "./pages/LoginPage";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/create" element={<CreateCollectionPage />} />
        <Route path="/detail/:id" element={<DetailCollectionPage />} />
        <Route path="*" element={<Navigate replace to="/create" />} />
        <Route path="/detail/:id/:itemId" element={<DetailItemPage />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};
