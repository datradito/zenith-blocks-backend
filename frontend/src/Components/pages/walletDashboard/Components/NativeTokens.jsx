import React from "react";
import axios from "axios";
import ButtonAtom from "../../../atoms/Button";
import TableDisplay from "../../../DisplayElements/TableDisplay";

function NativeTokens({ wallet, chain, nativeBalance, setNativeBalance, nativeValue, setNativeValue }) {

    async function getNativeBalance() {
        const response = await axios.get("http://localhost:8000/nativeBalance", {
            params: {
                address: wallet,
                chain: chain,
            },
        });
        

        if (response.data.balance && response.data.usd) {
            setNativeBalance((Number(response.data.balance) / 1e18).toFixed(3));
            setNativeValue(((Number(response.data.balance) / 1e18) * Number(response.data.usd)).toFixed(2));
        }
    }

    const buttonConfig = {
        innerText: 'Native Tokens',
        onClick: getNativeBalance,

    }

    const headers = ["Currency", "Balance", "Value"]
    const data = [{
        Native: "Native",
        Balance: nativeBalance,
        Value: `$${nativeValue}`,
    }];

    return (
        <>
            <ButtonAtom config={buttonConfig} />
            {(nativeBalance > 0 && nativeValue > 0) &&
                // <Table
                //     pageSize={1}
                //     noPagination={true}
                //     style={{ width: "900px" }}
                //     columnsConfig="300px 300px 250px"
                //     data={[["Native", nativeBalance, `$${nativeValue}`]]}
                //     header={[
                //         <span>Currency</span>,
                //         <span>Balance</span>,
                //         <span>Value</span>,
                //     ]}
                // />
                <TableDisplay tableHeaderData={headers} tableBodyData={data} />
            }

        </>
    );
}

export default NativeTokens;