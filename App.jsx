import React, { useEffect } from "react";
import {
  AdMob,
  BannerAdSize,
  BannerAdPosition
} from "@capacitor-community/admob";

const GAME_URL = "https://iq-card-game.base44.app";

const TEST_ADS = true;

const ADS = {
  banner: TEST_ADS
    ? "ca-app-pub-3940256099942544/9214589741"
    : "ca-app-pub-2783798495093877/9110743800",

  interstitial: TEST_ADS
    ? "ca-app-pub-3940256099942544/1033173712"
    : "ca-app-pub-2783798495093877/5850421576",

  rewarded: TEST_ADS
    ? "ca-app-pub-3940256099942544/5224354917"
    : "ca-app-pub-2783798495093877/5146734059"
};

export default function IQCardGame() {
  useEffect(() => {
    let active = true;

    const start = async () => {
      try {
        await AdMob.initialize();

        if (!active) return;

        await AdMob.showBanner({
          adId: ADS.banner,
          adSize: BannerAdSize.BANNER,
          position: BannerAdPosition.BOTTOM_CENTER,
          margin: 0,
          isTesting: TEST_ADS
        });
      } catch (error) {
        console.log("AdMob error:", error);
      }

      // Open the Base44 game directly in the Android WebView.
      // This avoids loading Base44 inside an iframe.
      window.location.replace(GAME_URL);
    };

    start();

    return () => {
      active = false;
      AdMob.removeBanner().catch(() => {});
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        margin: 0,
        padding: 0,
        background: "#ffffff"
      }}
    />
  );
}
