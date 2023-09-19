import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export const LoginForm = () => {
  const { login } = useContext(UserContext);
  // handle the Setup form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/login", {
        user: username,
        password: password,
      });

      login(username, res.data.token);
    } catch (e) {
      setError("Invalid username or password");
    }
  };

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  return (
    <form onSubmit={handleSubmit}>
      <h1>Welcome to the nginx manager GUI!</h1>
      <br />
      <h3>You should log in to access the dashboard</h3>

      <div className="form-group">
        <label htmlFor="username">Username: </label>
        <div className="inputs">
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="password">Password: </label>
        <div className="inputs">
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="submit">
        <div id="loginErrors">{error}</div>
        <button
          className="submitBtn"
          type="submit"
          disabled={password === "" || username === ""}
        >
          Log in
        </button>
      </div>
    </form>
  );
};
