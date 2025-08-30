import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { TranslationProvider } from "./context/TranslationContext.jsx"; // 👈 import provider
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <TranslationProvider>   {/* 👈 wrap the app here */}
        <App />
      </TranslationProvider>
    </BrowserRouter>
  </React.StrictMode>
);
