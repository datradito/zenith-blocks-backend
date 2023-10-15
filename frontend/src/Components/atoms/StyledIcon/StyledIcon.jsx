import styled from "styled-components";


const StyledIcon = styled("div")((props) => ({
  borderRadius: "0.8rem",
  border: "none",
  gap: "0.4rem",
  minWidth: "8rem",
  minHeight: "2.5rem",
  display: "flex",
    alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: props?.backgroundColor || "#1f2639",
  },
}));

export default StyledIcon;
