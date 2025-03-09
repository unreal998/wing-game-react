import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import "./i18n";
import { BrowserRouter } from "react-router-dom";
import WebApp from "@twa-dev/sdk";

document.addEventListener("DOMContentLoaded", () => {
  try {
    WebApp.requestFullscreen();
    WebApp.lockOrientation();
    WebApp.disableVerticalSwipes();
    WebApp.showAlert("Hey there");
  } catch (err: any) {
    WebApp.showAlert(err.toString());
  }
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
);
