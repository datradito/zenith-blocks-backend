import ResponsiveHeaderBar from "../Components/DisplayElements/Header/Header.jsx";
import { Outlet } from "react-router-dom";
import React from "react";
import { Box } from "@mui/system";

export default function Root() {
  return (
    <>
      <ResponsiveHeaderBar />
      <Box style={{ header: "80%" }}>
        <Outlet />
      </Box>
    </>
  );
}
