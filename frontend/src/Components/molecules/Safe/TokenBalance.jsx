import AmountLabel from "../../features/safe/AmountLabel";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";
function TokenBalance({ value, tokenSymbol }) {
  return (
    <AmountContainer>
      <Typography fontWeight="700">
        <AmountLabel amount={value} tokenSymbol={tokenSymbol} />
      </Typography>
    </AmountContainer>
  );
}

export default TokenBalance;

const AmountContainer = styled("div")(
  ({ theme, onClick }) => `
  border-radius: 6px;
  background-color: ${theme.palette.background.light};
  padding: 0px 8px;
  cursor: ${!!onClick ? "pointer" : "initial"};
  `
);
