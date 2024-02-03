import styled from "styled-components";

const Label = styled.label`
    font-size: ${props => props.fontSize || "0.85rem"};
    font-weight: 200;
    color: ${props => props.color || "grey"};
    font-weight: ${props => props.fontWeight || "200"};
    margin-bottom: ${props => props.marginBottom || "0rem"};
    margin-top: ${props => props.marginTop || "0rem"};
    `;

export default Label;
