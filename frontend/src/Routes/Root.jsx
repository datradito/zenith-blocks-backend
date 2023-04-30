import ResponsiveHeaderBar from "../Components/DisplayElements/Header/Header.jsx";
import { Outlet } from "react-router-dom";
import React from 'react'
import Proposals from "../Components/Proposals/Proposals";
import ProposalDetailView from "../Components/Proposals/ProposalDetailView.jsx";

export default function Root() {
    return (
        <>
            <ResponsiveHeaderBar />
            <Outlet />
        </>
    )
}
