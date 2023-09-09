import React from "react";
import axios from "axios";
import { Typography, Box, Table } from "@mui/material";
import ButtonAtom from "../../../atoms/Button";
import TableDisplay from "../../../DisplayElements/TableDisplay";



function Tokens({ wallet, chain, tokens, setTokens }) {

    async function getTokenBalances() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/tokenBalances`, {
            params: {
                address: wallet,
                chain: chain,
            },
        });

        if (response.data) {
            tokenProcessing(response.data);
        }
    }

    function tokenProcessing(t) {
        for (let i = 0; i < t.length; i++) {
            t[i].id=i;
            t[i].bal = (Number(t[i].balance) / Number(`1E${t[i].decimals}`)).toFixed(3);  //1E18
            t[i].val = ((Number(t[i].balance) / Number(`1E${t[i].decimals}`)) * Number(t[i].usd)).toFixed(2);
        }
        setTokens(t);
    }

    const buttonConfig = {
        innerText: 'ERC20 Tokens',
        onClick: getTokenBalances,

    }

    const headers = ["Currency", "Balance", "Value"]
    const data = tokens.map((e) => ({
        Logo: e.logo,
        Balance: e.bal,
        Value: `$${e.val}`,
    }));



    return (
        <Box sx={{color: "white"}}>
            <Typography>
                <ButtonAtom config={buttonConfig} />
                <br />
                {tokens.length > 0 && (
                    <TableDisplay tableHeaderData={headers} tableBodyData={data} />
                )}
            </Typography>
        </Box>
    );
}

export default Tokens;