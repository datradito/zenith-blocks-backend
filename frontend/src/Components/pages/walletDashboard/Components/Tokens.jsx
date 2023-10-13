import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_TOKEN_BALANCE } from "../../../../ServerQueries/Dashboard/Queries";
import CircularIndeterminate from "../../../atoms/Loader/loader";
import Box from "@mui/material/Box";
import Button from "../../../atoms/Button/Button";
import Container from "../../../atoms/Container/Container";


function Tokens({ wallet, chain, tokens, setTokens }) {
  const [getTokenBalance, { loading, error, data: tokenList }] = useLazyQuery(
    GET_TOKEN_BALANCE,
    {
      variables: { address: wallet },
    }
  );

  useEffect(() => {
    if (tokenList) {
      tokenProcessing(tokenList.getTokenBalances);
    }
  }, [tokenList]);

  if (loading) return <CircularIndeterminate />;
  if (error) return <p>Error :( </p>;

  function tokenProcessing(t) {
    for (let i = 0; i < t.length; i++) {
      t[i].id = i;
      t[i].val = (
        (Number(t[i].balance) / Number(`1E${t[i].decimals}`)) *
        Number(t[i].usd)
      ).toFixed(2);
    }
    setTokens(t);
  }

  const headers = ["Logo", "Balance", "Value", "Token"];
  const data = tokens.map((e) => ({
    Logo: e.logo,
    Balance: e.balance,
    Value: `$${e.val}`,
    Token: e.symbol,
  }));

    

  return (
    <Box>
      <button
        sx={{
          margin: "1rem",
        }}
        onClick={getTokenBalance}
      >
        ERC20 Tokens
      </button>
      <br />
          {tokens.length > 0 &&
              JSON.stringify(tokens)
          }
    </Box>
  );
}

export default Tokens;
