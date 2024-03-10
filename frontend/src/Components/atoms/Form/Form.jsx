import styled, { css } from "styled-components";

const Form = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-direction: ${(props) => (props.type === "modal" ? "column" : "row")};
  gap: 0.45rem;
  flex-wrap: wrap;
  justify-content: space-between;
  width: ${(props) => props.width || "100%"};
  ${(props) =>
    props.type === "regular" &&
    css`
      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: ${props.width} || 30rem;
    `}
    
  font-size: 1.2rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
