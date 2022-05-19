import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CollectionsPage } from "./pages/CollectionsPage";
import { CreateCollectionPage } from "./pages/CreateCollectionPage";
import { DetailCollectionPage } from "./pages/DetailCollectionPage";
import { DetailItemPage } from "./pages/DetailItemPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/generate" element={<CreateCollectionPage />} />
        <Route path="/detail/:id" element={<DetailCollectionPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="*" element={<Navigate replace to="/homepage" />} />
        <Route path="/detail/:id/:itemId" element={<DetailItemPage />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate replace to="/homepage" />} />
      <Route path="/homepage" element={<HomePage />} />
    </Routes>
  );
};
