import * as React from "react";
import Chip from "@mui/material/Chip";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

export default function CustomPDFViewIcon({ label = "PDF", ...props }) {
  const pdfIconStyles = {
    chipStyle: {
      color: "white",
      backgroundColor: "#242b33",
      "& .MuiSvgIcon-root": {
        color: "#1A65C0",
        fontSize: "0.75rem",
      },
    },
  };

  return (
    <Chip
      icon={<PictureAsPdfIcon />}
      label={label}
      onClick={props?.onClick}
      sx={pdfIconStyles.chipStyle}
    />
  );
}
