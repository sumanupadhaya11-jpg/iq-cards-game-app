import React, { useEffect } from "react";
import {
  AdMob,
  BannerAdSize,
  BannerAdPosition,
  RewardAdPluginEvents
} from "@capacitor-community/admob";

const GAME_URL = "https://iq-card-game.base44.app";

const ADS = {
  banner: "ca-app-pub-2783798495093877/9110743800",
  interstitial: "ca-app-pub-2783798495093877/5850421576",
  rewarded: "ca-app-pub-2783798495093877/5146734059"
};

export default function IQCardGame() {
  useEffect(() => {
    let active = true;

    const initAds = async () => {
      try {
        await AdMob.initialize();

        // Show banner ad
        await AdMob.showBanner({
          adId: ADS.banner,
          adSize: BannerAdSize.BANNER,
          position: BannerAdPosition.BOTTOM_CENTER,
          margin: 0,
          isTesting: false
        });

        // Listen for game events
        window.showRewardedAd = async () => {
          try {
            await AdMob.prepareRewardVideoAd({
              adId: ADS.rewarded
            });
            await AdMob.showRewardVideoAd();
          } catch (e) {
            console.log("Rewarded ad error");
          }
        };

        window.showInterstitialAd = async () => {
          try {
            await AdMob.prepareInterstitial({
              adId: ADS.interstitial
            });
            await AdMob.showInterstitial();
          } catch (e) {
            console.log("Interstitial ad error");
          }
        };

      } catch (error) {
        console.log("AdMob init error:", error);
      }

      if (active) {
        window.location.replace(GAME_URL);
      }
    };

    initAds();

    return () => {
      active = false;
      AdMob.removeBanner().catch(() => {});
    };
  }, []);

  return (
    <div style={{
      width: "100%",
      height: "100vh",
      margin: 0,
      padding: 0,
      background: "#ffffff"
    }} />
  );
}
