import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

import "./dashboard.css";
import { Site } from "../components/Site";

export const Dashboard = () => {
  const { logout } = useContext(UserContext);

  const [sites, setSites] = useState([]);
  const [error, setError] = useState("");

  const [refresh, setRefresh] = useState(false);

  const update = () => {
    setRefresh((e) => !e);
  };

  useEffect(() => {
    axios
      .get("/api/sites")
      .then((res) => {
        const sitios = res.data;
        setSites(sitios);
        setError("");
      })
      .catch((err) => {
        console.log(err);
        setError("Error loading sites");
      });
  }, [refresh]);

  return (
    <>
      <header>
        <h1>Nginx manager</h1>
        <button onClick={logout}>Logout</button>
      </header>
      <p>{error}</p>
      {sites.length === 0 ? (
        <p style={{ textAlign: "center", color: "#949292" }}>
          There's nothing to see here
        </p>
      ) : (
        <></>
      )}
      <section id="sites">
        {sites.map((site) => {
          return <Site site={site} update={update} key={site.id} />;
        })}
      </section>
    </>
  );
};
