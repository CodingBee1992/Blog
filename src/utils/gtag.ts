// Funkcje pomocnicze do śledzenia ruchu na stronach

declare global {
  interface Window {
    gtag: (command:string,eventName:string,params:{[key:string]:string|number|boolean}) => void;
    loadGTM?: () => void;
  }
}
// główna funkcja inicjalizująca GA4 i Consent Mode
export const initGA = () => {
  if (!window.gtag) return;
  // Wyłączenie automatycznego page_view
  window.gtag('config', 'G-XXXXXXXXXX', { send_page_view: false });
};

// główna funkcja inicjalizująca śledzenie
export const trackPageView = (path: string) => {
  if (!window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
};

// funkcja inicjalizująca procent przeczytania posta
export const trackScroll = (percent: number) => {
  if (!window.gtag) return;
  window.gtag('event', 'scroll', { percent });
};

// funkcja licząca czas spędzony na stronie
export const trackTimeSpent = (timeSpent: number) => {
  if (!window.gtag) return;

  window.gtag("event", "time_spent", {
    event_category: "Engagement",
    event_label: "Page Time",
    value: timeSpent, // czas spędzony na stronie w sekundach
  });
};
