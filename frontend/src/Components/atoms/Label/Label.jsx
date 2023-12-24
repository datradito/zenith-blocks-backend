import styled from "styled-components";

const Label = styled.label`
    font-size: .85rem;
    font-weight: 200;
    color: grey;
    margin-bottom: ${props => props.marginBottom || "0rem"};
    margin-top: ${props => props.marginTop || "0rem"};
    `;

export default Label;
