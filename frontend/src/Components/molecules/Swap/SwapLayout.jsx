import React from 'react'
import styled from 'styled-components'
import Container from '../../atoms/Container/Container';
import Label from '../../atoms/Label/Label';

function SwapLayout({ children}) {
  return (
    <div
    style={{
      border: "none",
      margin: "0",
    }}
    >
        {children}
    </div>
  );
}

const TradeBoxHeaderStyled = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
`;

const TradeBoxStyled = styled(Container)`
  width: 400px;
  background-color: #0e111b;
  min-height: 300px;
  border-radius: 0.8rem;
  padding: 1.5rem;
  margin: 5rem auto;
  gap: 1rem,
  border-radius: 1rem;
`;

const SwapMainStyled = styled(Container)`
    border: none;
  position: "relative";
`;

const TradeBoxHeader = ({ children }) => {
    return (
      <TradeBoxHeaderStyled>
        <Label
          style={{
            fontSize: "1rem",
            lineHeight: "20px",
            fontWeight: "500",
            paddingBottom: "4px",
            cursor: "pointer",
            color: "white",
          }}
        >
          Swap
        </Label>
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            margin: 0,
            border: "none",
          }}
            >
                {children}
          {/* <StyledRefreshIcon onClick={handleRefresh} />
          <SettingsPopover
            slippage={slippage}
            handleSlippageChange={handleSlippageChange}
          /> */}
        </Container>
      </TradeBoxHeaderStyled>
    );
}

const TradeBox = ({ children }) => {
    return (
        <TradeBoxStyled>
        {children}
        </TradeBoxStyled>
    )
}


const SwapMain = ({ children }) => {
    return (
        <SwapMainStyled>
        {children}
        </SwapMainStyled>
    )
}
    
SwapLayout.TradeBoxHeader = TradeBoxHeader
SwapLayout.TradeBox = TradeBox
SwapLayout.SwapMain = SwapMain


export default SwapLayout