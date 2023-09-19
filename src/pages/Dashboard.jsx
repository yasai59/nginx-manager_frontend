import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const Dashboard = () => {
  const { logout } = useContext(UserContext);

  return (
    <>
      <p>Dashboard</p>
      <br />
      <button onClick={logout}>Logout</button>
    </>
  );
};
