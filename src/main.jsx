import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./pages/App/App";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Route render={({ history }) => <App history={history} />} />
    </Router>
  </React.StrictMode>,
);
