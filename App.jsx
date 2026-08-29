import React, { useEffect } from "react";

export default function IQCardGame() {
  useEffect(() => {
    // Optional: Try to initialize AdMob if available
    if (typeof window !== 'undefined' && window.AdMob) {
      try {
        window.AdMob.initialize();
      } catch (e) {
        console.log("AdMob not available");
      }
    }
  }, []);

  return (
    <iframe
      title="IQ Card Game"
      src="https://iq-card-game.base44.app/"
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
        margin: 0,
        padding: 0,
        display: "block",
        backgroundColor: "#ffffff"
      }}
      allow="fullscreen; geolocation; camera; microphone"
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation allow-top-navigation"
    />
  );
}
