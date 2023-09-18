import React from "react";
import "./LoginPage.css";

import wall1 from "./assets/wallpapers/wall_1.jpg";
import wall2 from "./assets/wallpapers/wall_2.jpg";
import wall3 from "./assets/wallpapers/wall_3.jpg";
import { LoginForm } from "../components/LoginForm";
import { SetupForm } from "../components/SetupForm";

export const LoginPage = () => {
  const wallpapers = [wall1, wall2, wall3];

  const randomWallpaper = () => {
    const random = Math.floor(Math.random() * wallpapers.length);
    return wallpapers[random];
  };

  // TODO: Ask backend if we have already done the setup
  const setupDone = true;

  return (
    <div
      id="loginPage"
      style={{
        backgroundImage: `url(${randomWallpaper()})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div id="loginForm">{setupDone ? <LoginForm /> : <SetupForm />} </div>
    </div>
  );
};
