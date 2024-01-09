import React, { createContext, useState, useEffect } from "react";
import { useDisconnect } from "wagmi";
import { clearAuthData, decodeToken, isTokenExpired } from "../auth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { disconnectAsync } = useDisconnect();
  const [user, setUser] = useState(null);
  

  const getUserFromStorage = () => {
    const token = sessionStorage.getItem("authToken");
    const decodedToken = decodeToken(token);

    if (isTokenExpired(decodedToken)) {
      logoutAndClearUser();
      return;
    }
    setUser(decodedToken);
  };

  const logoutAndClearUser = () => {
    disconnectAsync();
    clearAuthData();
    setUser(null);
  };

  // Fetch the user on component mount
  useEffect(() => {
    getUserFromStorage();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        getUserFromStorage,
        logoutAndClearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
