import ResponsiveHeaderBar from "../Components/features/home/Header";
import { Outlet } from "react-router-dom";
import React from "react";

import styled from "styled-components";
import { Container } from "@mui/material";

export const WidthContainer = styled(Container)`
  width: 90%;
  @media (min-width: 1000px) {
    width: 900px;
  }
`;

export default function Root() {
  return (
    <WidthContainer>
      <ResponsiveHeaderBar />
      <Outlet />
    </WidthContainer>
  );
}
