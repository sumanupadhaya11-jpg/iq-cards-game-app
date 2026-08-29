import React, { useEffect } from "react";
import {
  AdMob
} from "@capacitor-community/admob";

const GAME_URL = "https://iq-card-game.base44.app";

export default function IQCardGame() {
  useEffect(() => {
    const start = async () => {
      try {
        // Initialize AdMob safely
        if (window.AdMob) {
          await AdMob.initialize();
          console.log("AdMob initialized");
        }
      } catch (error) {
        console.log("AdMob init skipped - continuing");
      }

      // Navigate to game (no iframe blocking)
      window.location.replace(GAME_URL);
    };

    start();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        margin: 0,
        padding: 0,
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <p>Loading game...</p>
    </div>
  );
}
