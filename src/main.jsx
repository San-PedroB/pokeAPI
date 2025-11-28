import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import 'react-h5-audio-player/lib/styles.css';
import "./styles/global.css";
import "./styles/theme.css";
import "./styles/responsive.css";
import "./styles/pokemon-types.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
