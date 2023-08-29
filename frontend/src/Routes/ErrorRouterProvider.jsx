import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

export const ErrorContext = createContext();

export const useError = () => useContext(ErrorContext);

const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [showSnackbar, setShowSnackbar] = useState(false);

    const handleError = (errorMessage) => {
        setError({error: errorMessage.error, message: errorMessage.message});
        setShowSnackbar(true);
    };

    useEffect(() => {
        if (error === null) {
            setShowSnackbar(false);
        } else {
            setShowSnackbar(true);
        }
    }, [error]);

    return (
        <ErrorContext.Provider value={{ handleError }}>
            {children}
            {
                showSnackbar && (
                    error.error === "error" ? (
                        toast.error(error.message)
                    ) : (
                        toast.success(error.message)
                    )
                )
            }
        </ErrorContext.Provider>
    );
};

export default ErrorProvider;
