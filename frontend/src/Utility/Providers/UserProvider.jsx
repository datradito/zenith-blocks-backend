import React, { createContext, useState, useEffect, useCallback } from "react";
import { clearAuthData, decodeToken, isTokenExpired } from "../auth";
import { useDisconnect } from "wagmi";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { disconnectAsync } = useDisconnect();
  const [user, setUser] = useState(null);


  const getUserFromStorage = useCallback(() => {
    const token = sessionStorage.getItem("authToken");
    const decodedToken = decodeToken(token);
    if (isTokenExpired(decodedToken)) {
      disconnectAsync();
      clearAuthData();
      setUser(null);
    } else {
      setUser(decodedToken);
    }
  }, []);

  useEffect(() => {
    getUserFromStorage();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        getUserFromStorage,
        decodeToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
