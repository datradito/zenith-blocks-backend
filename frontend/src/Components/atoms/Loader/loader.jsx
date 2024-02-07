import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const StyledCircularIndeterminate = styled(Box)(({ theme, styleProps }) => ({
  width: "90%",
  margin: "0rem auto",
  textAlign: "center",
  color: "white",
  marginTop: "1rem",
  borderRadius: 3,
  ...(styleProps && styleProps),
}));

export default function CircularIndeterminate({ styleProps }) {
  return (
    <StyledCircularIndeterminate styleProps={styleProps}>
      <CircularProgress />
    </StyledCircularIndeterminate>
  );
}
