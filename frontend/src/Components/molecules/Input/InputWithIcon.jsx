import styled from "styled-components";
import InputBase from "@mui/material/InputBase";

const InputWithIcon = styled(InputBase)`
    background-color: transparent;
    border: none;
    padding: 0 0.5rem;
    width: 100%;
    &::placeholder {
        color: white;
    }
    `;
export default InputWithIcon;

