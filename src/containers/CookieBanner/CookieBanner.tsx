// Montujemy w App.tsx zeby sie odpaliła funkcja initGA do śledzenia wyświetleń stron a także do dalszych analiz

import { useEffect, useState } from "react";
import Cookies from "js-cookie";


declare global {
  interface Window {
    gtag: ( command:string,eventName:string,params:{[key:string]:string|number|boolean}) => void;
    loadGTM?: () => void;
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showAnim, setShowAnim] = useState(false);
  const [analytic, setAnalytic] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    const isFirstTime = !localStorage.getItem("hasSeenCookieBanner");
    if (isFirstTime) {
      setShowAnim(true);
      localStorage.setItem("hasSeenCookieBanner", "true");
      setTimeout(() => setVisible(true), 500);
    } else {
      setVisible(false);
    }
  }, []);

  const hideBanner = () => setVisible(false);

  const updateConsent = (
    analytics: boolean,
    marketingConsent: boolean
  ) => {
    if (window.gtag) {
      const consentObj: Record<string, "granted" | "denied"> = {
        ad_storage: marketingConsent ? "granted" : "denied",
        ad_personalization: marketingConsent ? "granted" : "denied",
        ad_user_data: marketingConsent ? "granted" : "denied",
        analytics_storage: analytics ? "granted" : "denied",
        functionality_storage: "granted",
        personalization_storage: analytics || marketingConsent ? "granted" : "denied",
        security_storage: "granted",
      };
      window.gtag("consent", "update", consentObj);
    }

    Cookies.set("isBaseCookieAccept", "true",{expires:365,sameSite:"Lax",secure:true});
    Cookies.set("isAnalyticCookieAccept", analytics ? "true" : "false",{expires:365,sameSite:"Lax",secure:true});
    Cookies.set("isMarketingCookieAccept", marketingConsent ? "true" : "false",{expires:365,sameSite:"Lax",secure:true});

    hideBanner();

    if (typeof window.loadGTM === "function") window.loadGTM();
  };

  if (!showAnim && !visible) return null;

  return (
    <div
      id="bottomCookieContainer"
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        background: "#222",
        color: "#fff",
        padding: "1rem",
        display: visible ? "block" : "none",
        transition: "opacity 0.5s",
        opacity: visible ? 1 : 0,
        zIndex: 9999,
      }}
    >
      <p>
        Ta strona używa cookies w celach analitycznych i marketingowych.
      </p>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button onClick={() => updateConsent(false, false)}>
          Odrzuć wszystkie
        </button>
        <button onClick={() => updateConsent(true, true)}>
          Akceptuj wszystkie
        </button>
        <button
          onClick={() => updateConsent(analytic, marketing)}
        >
          Zapisz wybrane
        </button>
      </div>

      <div style={{ marginTop: "0.5rem" }}>
        <label>
          <input
            type="checkbox"
            checked={analytic}
            onChange={(e) => setAnalytic(e.target.checked)}
          />
          Analityka
        </label>
        <label style={{ marginLeft: "1rem" }}>
          <input
            type="checkbox"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
          />
          Marketing
        </label>
      </div>
    </div>
  );
}