import { useRouteError } from "react-router-dom";
import React, { useEffect } from 'react';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn } from "../actions/createAuthAction";

export default function ErrorPage() {
    const routerError = useRouteError();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const token = sessionStorage.getItem("authToken");

    useEffect(() => {
        if (isLoggedIn === true && !token) {
            dispatch(setIsLoggedIn(false));
        }
    }, [token]);

    return <div>{toast.error(routerError.message)}</div>;
}