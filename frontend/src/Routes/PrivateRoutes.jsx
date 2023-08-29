import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDisconnect } from 'wagmi';

const PrivateRoute = ({ component: component, ...rest }) => {
    const [authError, setAuthError] = useState(null);
    const token = sessionStorage.getItem("authToken");
    const { disconnect } = useDisconnect();
    

    useEffect(() => {
        if (token === null) {
            setAuthError("User is not Authenticated. Please connect wallet!");
            disconnect();
        } else {
            setAuthError(null);
        }
    }, [token]);


    return token ? <Outlet /> : (
        toast.error(authError)
    );
};

export default PrivateRoute;