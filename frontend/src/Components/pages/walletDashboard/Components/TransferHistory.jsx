import React from "react";
import axios from "axios";
import { Table } from "@mui/material";
import ButtonAtom from "../../../atoms/Button";

function TransferHistory({ chain, wallet, transfers, setTransfers }) {

    async function getTokenTransfers() {
            const response = await axios.get(`http://localhost:8000/tokenTransfers`, {
            params: {
                address: wallet,
                chain: chain,
            },
            });
        console.log(response.data);

        if (response.data) {
            setTransfers(response.data);
        }
    }

    const buttonConfig = {
        innerText: "ERC20 Transfers",
        onClick: getTokenTransfers,
    };

    return (
        <>
            <div className="tabHeading">
                <ButtonAtom config={buttonConfig} />
            </div>
            <div>
                {transfers.length > 0 && (
                    <Table
                        pageSize={8}
                        noPagination={false}
                        style={{ width: "90vw" }}
                        columnsConfig="16vw 18vw 18vw 18vw 16vw"
                        data={transfers.map((e) => [
                            e.symbol,
                            (Number(e.value) / Number(`1e${e.decimals}`)).toFixed(3),
                            `${e.from_address.slice(0, 4)}...${e.from_address.slice(38)}`,
                            `${e.to_address.slice(0, 4)}...${e.to_address.slice(38)}`,
                            e.block_timestamp.slice(0, 10),
                        ])}
                        header={[
                            <span>Token</span>,
                            <span>Amount</span>,
                            <span>From</span>,
                            <span>To</span>,
                            <span>Date</span>,
                        ]}
                    />
                )}
            </div>
            </>
    );
}

export default TransferHistory;