import React, { createContext, useState, useEffect } from "react";
import { useDisconnect } from "wagmi";

function decodeToken(token) {
  if (!token) {
    return null;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const { disconnectAsync } = useDisconnect();
  const [user, setUser] = useState(null);

  const fetchUser = () => {
    const token = sessionStorage.getItem("authToken");
    const decodedUser = decodeToken(token);

    // Check if the token is valid and the user is logged in
    if (decodedUser) {
      //Todo: check if token is expired using decoded token expiry time and current time
      setUser(decodedUser);
    } else {
      // Token is invalid or user is not logged in, perform necessary actions
      // For example, log the user out or clear user state
      logOutUser();
    }
  };

  const logOutUser = () => {
    disconnectAsync();
    sessionStorage.clear();
    setUser(null);
  };

  // Fetch the user on component mount
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        fetchUser,
        logOutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
