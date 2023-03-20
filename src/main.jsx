import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { HashRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </ChakraProvider>
  </React.StrictMode>
);
