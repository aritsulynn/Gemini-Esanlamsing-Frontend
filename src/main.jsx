import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserProvider } from "./UserContext";
// import
import Nav from "./components/Navbar";

// pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ValidateSciencePlan from "./pages/ValidateSciencePlan";
import InstallNewConfig from "./pages/InstallNewConfig";
import SubmitSciencePlan from "./pages/SubmitSciencePlan.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/validate" element={<ValidateSciencePlan />} />
        <Route path="/install" element={<InstallNewConfig />} />
        <Route path="/submit" element={<SubmitSciencePlan />} />
      </Routes>
    </UserProvider>
  </BrowserRouter>
);
