import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import { TrackingCacheProvider } from "./context/TrackingCacheContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TrackingCacheProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </TrackingCacheProvider>
  </StrictMode>
);
