import { useRouteError } from "react-router-dom";
import React from 'react';
import { toast } from "react-toastify";


export default function ErrorPage() {
    const routerError = useRouteError();

    return <div>{toast.error(routerError.message)}</div>;
}