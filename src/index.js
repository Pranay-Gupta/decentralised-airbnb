import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import Context from "./Context";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      appId={process.env.REACT_APP_MORALIS_APP_ID}
      serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL}
    >
      <NotificationProvider>
        <Context>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Context>
      </NotificationProvider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
