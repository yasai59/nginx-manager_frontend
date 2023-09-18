import { useState } from "react";

import { PasswordChecker } from "./PasswordChecker";
import "./form.css";

export const SetupForm = () => {
  // handle the Setup form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
  };

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [username, setUsername] = useState("");

  return (
    <form onSubmit={handleSubmit}>
      <h1>Welcome to the nginx manager GUI!</h1>
      <br />
      <h3>Create your admin account to get started</h3>

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
            id="passwordSetup"
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            name="repeat-password"
            placeholder="Repeat password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <PasswordChecker password={password} />
      <div className="submit">
        <div id="setupErrors">
          {password !== repeatPassword && (
            <p className="error">Passwords do not match</p>
          )}
        </div>
        <button
          className="submitBtn"
          type="submit"
          disabled={
            password !== repeatPassword || password === "" || username === ""
          }
        >
          Create account
        </button>
      </div>
    </form>
  );
};
