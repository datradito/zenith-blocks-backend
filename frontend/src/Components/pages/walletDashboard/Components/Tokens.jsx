import React, { useEffect } from "react";
import { Typography, Box } from "@mui/material";
import ButtonAtom from "../../../atoms/Button";
import { useQuery } from "@apollo/client";
import { GET_TOKEN_BALANCE } from "../../../../ServerQueries/Dashboard/Queries";
import CircularIndeterminate from "../../../atoms/Loader/loader";
import Table from "../../../molecules/Table";

function Tokens({ wallet, chain, tokens, setTokens }) {

    const {loading, error, data: tokenList } = useQuery(
        GET_TOKEN_BALANCE,
        {
        variables: { address: wallet },
    });
    
    useEffect(() => {
        if (tokenList) {
            tokenProcessing(tokenList.getTokenBalances);
        }
    }, [tokenList]);

    if (loading) return <CircularIndeterminate />;
    if (error) return <p>Error :( </p>;

    function tokenProcessing(t) {
        console.log(t);
        for (let i = 0; i < t.length; i++) {
            t[i].id = i;
            t[i].val = ((Number(t[i].balance) / Number(`1E${t[i].decimals}`)) * Number(t[i].usd)).toFixed(2);
        }
        setTokens(t);
    }

    const buttonConfig = {
        innerText: 'ERC20 Tokens',
    }

    const headers = ["Logo", "Balance", "Value", "Token"]
    const data = tokens.map((e) => ({
        Logo: e.logo,
        Balance: e.balance,
        Value: `$${e.val}`,
        Token: e.symbol,
    }));


    return (
        <Box sx={{color: "white"}}>
            <Typography>
                <ButtonAtom config={buttonConfig} />
                <br />
                {tokens.length > 0 && (
                    <Table tableHeaderData={headers} tableBodyData={data} />
                )}
            </Typography>
        </Box>
    );
}

export default Tokens;