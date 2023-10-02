import React, { useEffect } from "react";
import ButtonAtom from "../../../atoms/Button";
import { useLazyQuery } from "@apollo/client";
import { GET_TRANSACTION_HISTORY } from "../../../../ServerQueries/Dashboard/Queries";
import Table from "../../../molecules/Table";
import { transformTransactionHistory } from "../../../../Utility/transformItems";
const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

function TransferHistory({ chain, wallet, transfers, setTransfers }) {

    const [getTransactionHistory, { loading, error, data: transactionHistory }] = useLazyQuery(
      GET_TRANSACTION_HISTORY,
      {
        variables: { address: wallet },
      }
    );
    
    useEffect(() => {
        if (transactionHistory) {
            const history = transformTransactionHistory(transactionHistory.getTokenTransactionHistory);
            setTransfers(history);
        }
    }, [transactionHistory]);

    async function getTokenTransfers() {
        await getTransactionHistory(wallet);
    }

    const buttonConfig = {
        innerText: "ERC20 Transfers",
        onClick: getTokenTransfers,
    };

    return (
        <>
                <ButtonAtom config={buttonConfig} />
                {transfers.length > 0 && (

                    <Table tableHeaderData={["Token", "Amount", "From", "To", "Block"]} tableBodyData={transfers} />

                    //     data={transfers.map((e) => [
                    //         e.asset,
                    //         (Number(e.value)).toFixed(3),
                    //         `${e.from.slice(0, 4)}...${e.from.slice(38)}`,
                    //         `${e.to.slice(0, 4)}...${e.to.slice(38)}`,
                    //         e.blockNum.slice(0, 10),
                    //     ])}

                )}
            </>
    );
}

export default TransferHistory;