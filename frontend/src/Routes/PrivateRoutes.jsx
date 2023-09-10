import React, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDisconnect } from 'wagmi';

const PrivateRoute = ({ component, ...rest }) => {
    const [authError, setAuthError] = useState(null);
    const token = sessionStorage.getItem("authToken");
    const { disconnectAsync } = useDisconnect();
    

    useEffect(() => {
        if (token === null) {
            disconnectAsync();
            setAuthError("User is not Authenticated. Please connect wallet!");
        } else {
            setAuthError(null);
        }
    }, [token, disconnectAsync]);


    return token ? <Outlet /> : (
        toast.error(authError)
    );
};

export default PrivateRoute;