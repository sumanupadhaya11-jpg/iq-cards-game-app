import React, { useEffect } from "react";
import {
  AdMob,
  BannerAdSize,
  BannerAdPosition
} from "@capacitor-community/admob";

const TEST_ADS = false;

const ADS = {
  banner: "ca-app-pub-2783798495093877/9110743800",
  interstitial: "ca-app-pub-2783798495093877/5850421576",
  rewarded: "ca-app-pub-2783798495093877/5146734059"
};

export default function IQCardGame() {
  useEffect(() => {
    let mounted = true;

    async function setupAds() {
      try {
        await AdMob.initialize();

        if (!mounted) return;

        await AdMob.showBanner({
          adId: ADS.banner,
          adSize: BannerAdSize.BANNER,
          position: BannerAdPosition.BOTTOM_CENTER,
          margin: 0,
          isTesting: TEST_ADS
        });

        console.log("AdMob banner requested");
      } catch (error) {
        console.error("AdMob setup failed:", error);
      }
    }

    setupAds();

    return () => {
      mounted = false;
      AdMob.removeBanner().catch(() => {});
    };
  }, []);

  return (
    <iframe
      title="IQ CARD'S GAME"
      src="https://iq-card-game.base44.app"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        border: "none"
      }}
      allow="fullscreen"
    />
  );
}
