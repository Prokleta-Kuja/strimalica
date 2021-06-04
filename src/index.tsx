import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { RadioCtxProvider } from "./RadioContext";

ReactDOM.render(
  <React.StrictMode>
    <RadioCtxProvider>
      <App />
    </RadioCtxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
