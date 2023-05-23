import ResponsiveHeaderBar from "../Components/DisplayElements/Header/Header.jsx";
import { Outlet } from "react-router-dom";
import React from 'react';

export default function Root() {
    return (
        <>
            <ResponsiveHeaderBar />
            <Outlet />
        </>
    )
}
