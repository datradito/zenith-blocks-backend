import React, { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";

export const ErrorContext = createContext();

export const useError = () => useContext(ErrorContext);

const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);
    

  const handleError = (errorMessage) => {
    setError(errorMessage);
    if (errorMessage.type === "error") {
      toast.error(`coming from error router ${errorMessage.message}`);
    } else {
      toast.success(errorMessage.message);
    }
  };

  return (
    <ErrorContext.Provider value={{ handleError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
