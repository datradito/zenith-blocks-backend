import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Utility/Providers/UserProvider";

const isAuthenticated = () => {
  const token = sessionStorage.getItem("authToken");
  if (!token) {
    return false;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const decodedToken = JSON.parse(window.atob(base64));
  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp > currentTime;
};

const logoutUser = () => {
  return <Navigate to="/" />;
};

const ProtectedRoute = ({ children }) => {
  const { logoutAndClearUser } = useContext(UserContext);
  return isAuthenticated() ? children : logoutUser();
};

export default ProtectedRoute;
