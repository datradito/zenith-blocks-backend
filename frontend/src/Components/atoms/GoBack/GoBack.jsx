import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styled from "styled-components";

const BackButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const GoBack = ({children}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <BackButton onClick={handleGoBack}>
      <ArrowBackIcon
        sx={{
          color: "white",
        }}
      />
      {children}
    </BackButton>
  );
};

export default GoBack;
