import React, { useEffect, useRef } from "react";
import {
  AdMob,
  BannerAdSize,
  BannerAdPosition
} from "@capacitor-community/admob";

const GAME_URL = "https://iq-card-game.base44.app";

const USE_TEST_ADS = true;

const TEST_ADS = {
  banner: "ca-app-pub-3940256099942544/9214589741",
  interstitial: "ca-app-pub-3940256099942544/1033173712",
  rewarded: "ca-app-pub-3940256099942544/5224354917"
};

const LIVE_ADS = {
  banner: "ca-app-pub-2783798495093877/9110743800",
  interstitial: "ca-app-pub-2783798495093877/5850421576",
  rewarded: "ca-app-pub-2783798495093877/5146734059"
};

const ADS = USE_TEST_ADS ? TEST_ADS : LIVE_ADS;

export default function IQCardGame() {
  const iframeRef = useRef(null);

  useEffect(() => {
    let active = true;

    async function initializeAds() {
      try {
        await AdMob.initialize();

        if (!active) return;

        await AdMob.showBanner({
          adId: ADS.banner,
          adSize: BannerAdSize.BANNER,
          position: BannerAdPosition.BOTTOM_CENTER,
          margin: 0,
          isTesting: USE_TEST_ADS
        });
      } catch (error) {
        console.log("AdMob initialization error:", error);
      }
    }

    initializeAds();

    return () => {
      active = false;
      AdMob.removeBanner().catch(() => {});
    };
  }, []);

  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.origin !== "https://iq-card-game.base44.app") {
        return;
      }

      const type = event.data?.type;

      try {
        if (type === "gameOver") {
          await AdMob.prepareInterstitial({
            adId: ADS.interstitial,
            isTesting: USE_TEST_ADS
          });

          await AdMob.showInterstitial();
        }

        if (type === "showRewarded") {
          await AdMob.prepareRewardVideoAd({
            adId: ADS.rewarded,
            isTesting: USE_TEST_ADS
          });

          const reward = await AdMob.showRewardVideoAd();

          if (iframeRef.current) {
            iframeRef.current.contentWindow.postMessage(
              {
                type: "rewardGranted",
                reward
              },
              GAME_URL
            );
          }
        }
      } catch (error) {
        console.log("Ad error:", error);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        background: "#ffffff"
      }}
    >
      <iframe
        ref={iframeRef}
        title="IQ CARD'S GAME"
        src={GAME_URL}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block"
        }}
        allow="fullscreen"
      />
    </div>
  );
}
