import React, { createContext, useState, useEffect, useCallback, useMemo } from "react";
import { clearAuthData, decodeToken, isTokenExpired } from "../auth";
import { useDisconnect } from "wagmi";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { disconnect } = useDisconnect();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserFromStorage = useCallback(() => {
    const token = sessionStorage.getItem("authToken");
    const decodedToken = decodeToken(token);
    if (isTokenExpired(decodedToken)) {
      disconnect();
      clearAuthData();
      return null;
    }
    return decodedToken;
  }, [disconnect]);

  const decodedUser = useMemo(() => {
    return getUserFromStorage();
  }, [getUserFromStorage]);

  useEffect(() => {
    setUser(decodedUser);
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        setUser,
        getUserFromStorage,
        decodeToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
