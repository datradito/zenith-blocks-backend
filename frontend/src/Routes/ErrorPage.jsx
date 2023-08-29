import { useRouteError } from "react-router-dom";
import React from 'react';

import { toast } from "react-toastify";

export default function ErrorPage() {

    return (
        <div>
            {
                toast.error("Something went wrong please start from home page")
            }
        </div>
    );
}