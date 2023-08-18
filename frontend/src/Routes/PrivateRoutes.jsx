import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ component: component, ...rest }) => {
    const token = sessionStorage.getItem("authToken");
    return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;