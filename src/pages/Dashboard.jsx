import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

import "./dashboard.css";

export const Dashboard = () => {
  const { logout } = useContext(UserContext);

  return (
    <>
      <h1>Nginx manager</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
};
