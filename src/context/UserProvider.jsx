import { useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [nombre, setNombre] = useState(localStorage.getItem("nombre") || "");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const login = (nombre, token) => {
    setNombre(nombre);
    setToken(token);

    localStorage.setItem("nombre", nombre);
    localStorage.setItem("token", token);
    axios.defaults.headers.common["x-token"] = token;
  };

  const logout = () => {
    setNombre("");
    setToken("");

    localStorage.removeItem("nombre");
    localStorage.removeItem("token");
    axios.defaults.headers.common["x-token"] = "";

    location.reload();
  };

  return (
    <UserContext.Provider value={{ nombre, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
