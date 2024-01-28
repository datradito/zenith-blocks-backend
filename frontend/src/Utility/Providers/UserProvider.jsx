import React, { createContext, useState, useEffect, useCallback } from "react";
import { clearAuthData, decodeToken, isTokenExpired } from "../auth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  //const { disconnectAsync } = useDisconnect();
  const [user, setUser] = useState(null);

    const logoutAndClearUser = useCallback(() => {
      //disconnectAsync();
      clearAuthData();
      setUser(null);
    }, [setUser]);


  const getUserFromStorage = useCallback(() => {
    const token = sessionStorage.getItem("authToken");
    const decodedToken = decodeToken(token);

    if (isTokenExpired(decodedToken)) {
      logoutAndClearUser();
      return;
    }
    setUser(decodedToken);
  }, [logoutAndClearUser, setUser]);

  // Fetch the user on component mount
  useEffect(() => {
    getUserFromStorage();
  }, [getUserFromStorage]);

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
