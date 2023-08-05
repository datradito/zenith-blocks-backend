import React from "react";
import axios from "axios";
// import { Button } from '@web3uikit/core';
import { Typography, Box } from "@mui/material";
import { Reload } from '@web3uikit/icons';
import { Button, Table } from '@web3uikit/core';
import ButtonAtom from "../../../atoms/Button";

function Tokens({ wallet, chain, tokens, setTokens }) {


    async function getTokenBalances() {
        const response = await axios.get("http://localhost:8000/tokenBalances", {
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
            t[i].bal = (Number(t[i].balance) / Number(`1E${t[i].decimals}`)).toFixed(3);  //1E18
            t[i].val = ((Number(t[i].balance) / Number(`1E${t[i].decimals}`)) * Number(t[i].usd)).toFixed(2);
        }
        setTokens(t);
    }

    // const buttonConfig = {
    //     innerText: 'ERC20 Tokens',
    //     onClick: getTokenBalances,

    // }
    return (
        <Box>
            <Typography>
                <div>ERC20 Tokens <Reload onClick={getTokenBalances} /></div>
                <br />
                {tokens.length > 0 && (
                    <Table
                        pageSize={6}
                        noPagination={true}
                        style={{ width: "900px" }}
                        columnsConfig="300px 300px 250px"
                        data={tokens.map((e) => [e.symbol, e.bal, `$${e.val}`])}
                        header={[
                            <span>Currency</span>,
                            <span>Balance</span>,
                            <span>Value</span>,
                        ]}
                    />
                )}
            </Typography>
        </Box>
    );
}

export default Tokens;