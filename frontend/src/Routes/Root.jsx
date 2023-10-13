import ResponsiveHeaderBar from "../Components/DisplayElements/Header/Header.jsx";
import { Outlet } from "react-router-dom";
import React from "react";
import Container from "../Components/atoms/Container/Container.jsx";

export default function Root() {
  return (
    <>
      <ResponsiveHeaderBar />
      <Container
        style={{
          width: "100%",
          margin: "0 auto",
          border: "none",
          height: "100dvh",
        }}
      >
        <Outlet />
      </Container>
    </>
  );
}
