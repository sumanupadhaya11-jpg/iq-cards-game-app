import React, { useEffect, useRef, useState } from 'react';

export default function IQCardGame() {
  const iframeRef = useRef(null);
  const [adMobReady, setAdMobReady] = useState(false);

  useEffect(() => {
    initializeAdMob();
  }, []);

  const initializeAdMob = async () => {
    try {
      // Check if AdMob is available (Capacitor environment)
      if (window.AdMob) {
        await window.AdMob.initialize();
        setAdMobReady(true);
        showBannerAd();
      }
    } catch (error) {
      console.log('AdMob not available - running in web mode');
    }
  };

  const showBannerAd = async () => {
    try {
      if (window.AdMob) {
        await window.AdMob.showBanner({
          adId: 'ca-app-pub-2783798495093877/9110743800',
          adSize: 'BANNER',
          position: 'BOTTOM',
          margin: 0,
        });
      }
    } catch (error) {
      console.log('Banner Ad Error:', error);
    }
  };

  const showRewardedAd = async () => {
    try {
      if (window.AdMob) {
        await window.AdMob.prepareRewardVideoAd({
          adId: 'ca-app-pub-2783798495093877/5146734059',
        });
        await window.AdMob.showRewardVideoAd();
        return true;
      }
    } catch (error) {
      console.log('Rewarded Ad Error:', error);
      return false;
    }
  };

  const showInterstitialAd = async () => {
    try {
      if (window.AdMob) {
        await window.AdMob.prepareInterstitial({
          adId: 'ca-app-pub-2783798495093877/5850421576',
        });
        await window.AdMob.showInterstitial();
      }
    } catch (error) {
      console.log('Interstitial Ad Error:', error);
    }
  };

  // Listen for game events from iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'gameOver') {
        showInterstitialAd();
      }
      if (event.data.type === 'showRewarded') {
        showRewardedAd();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      backgroundColor: '#1a0033'
    }}>
      {/* Game Container */}
      <div style={{
        flex: 1,
        width: '100%',
        overflow: 'hidden',
        paddingBottom: '60px' // Space for banner ad
      }}>
        <iframe
          ref={iframeRef}
          src="https://iq-card-game.base44.app"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block'
          }}
          allow="camera; microphone; payment"
          title="IQ CARD'S GAME"
        />
      </div>

      {/* Banner Ad Space */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '60px',
        backgroundColor: '#000',
        borderTop: '1px solid #333'
      }}>
        {/* AdMob banner will render here */}
      </div>
    </div>
  );
            }
        
