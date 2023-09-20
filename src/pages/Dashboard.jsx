import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

import "./dashboard.css";
import { Site } from "../components/Site";
import { UtilityBar } from "../components/UtilityBar";

export const Dashboard = () => {
  const { logout } = useContext(UserContext);

  const [sites, setSites] = useState([]);
  const [filteredSites, setFilteredSites] = useState([]); // TODO: Implementar el search
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

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

  useEffect(() => {
    setFilteredSites(sites.filter((site) => site.title.includes(search)));
  }, [search, sites]);

  return (
    <>
      <header>
        <h1>Nginx manager</h1>
        <button onClick={logout}>Logout</button>
      </header>
      <div className="utility">
        <UtilityBar setSearch={setSearch} search={search} update={update} />
      </div>
      <p>{error}</p>
      {sites.length === 0 ? (
        <p style={{ textAlign: "center", color: "#949292" }}>
          There's nothing to see here
        </p>
      ) : (
        <></>
      )}
      <section id="sites">
        {filteredSites.map((site) => {
          return <Site site={site} update={update} key={site.id} />;
        })}
      </section>
    </>
  );
};
