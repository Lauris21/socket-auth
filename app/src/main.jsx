import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import { UserContextProvider } from "./constext/userContext.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";

const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={client_id}>
    <React.StrictMode>
      <BrowserRouter basename="/">
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoutes>
                    <Dashboard />
                  </ProtectedRoutes>
                }
              />
            </Route>
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
