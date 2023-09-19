import axios from "axios";
import "./LoginPage.css";

import wall1 from "./assets/wallpapers/wall_1.jpg";
import wall2 from "./assets/wallpapers/wall_2.jpg";
import wall3 from "./assets/wallpapers/wall_3.jpg";
import { LoginForm } from "../components/LoginForm";
import { SetupForm } from "../components/SetupForm";
import { useEffect, useState } from "react";

export const LoginPage = () => {
  const wallpapers = [wall1, wall2, wall3];

  const randomWallpaper = () => {
    const random = Math.floor(Math.random() * wallpapers.length);
    return wallpapers[random];
  };

  // Ask backend if we have already done the setup
  const [setupDone, setSetupDone] = useState(true);

  useEffect(() => {
    axios.get("/api/setup").then((res) => {
      const data = res.data;
      setSetupDone(data.setup);
    });
  }, []);

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
