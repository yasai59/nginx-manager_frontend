import React from "react";
import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { UserContext } from "./context/UserContext";
import { LoginPage } from "./pages/LoginPage";
import { Dashboard } from "./pages/Dashboard";
import axios from "axios";

export const App = () => {
  const { nombre, token } = useContext(UserContext);

  const autenticado = nombre && token;

  axios.defaults.headers.common["x-token"] = token;
  axios.defaults.baseURL = "http://localhost:81";

  return (
    <Routes>
      {autenticado ? (
        <Route path="/" element={<Dashboard />} />
      ) : (
        <Route path="/" element={<LoginPage />} />
      )}
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
