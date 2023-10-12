import React, { useEffect } from "react";
import Button from "../../../atoms/Button/Button";
import { useLazyQuery } from "@apollo/client";
import { GET_TRANSACTION_HISTORY } from "../../../../ServerQueries/Dashboard/Queries";
import { transformTransactionHistory } from "../../../../Utility/transformItems";
import CircularIndeterminate from "../../../atoms/Loader/loader";
import Label from "../../../atoms/Label/Label";

function TransferHistory({ chain, wallet, transfers, setTransfers }) {

    const [getTransactionHistory, { loading, error, data: transactionHistory }] = useLazyQuery(
      GET_TRANSACTION_HISTORY,
      {
        variables: { address: wallet },
      }
    );
    
    useEffect(() => {
        if (transactionHistory) {
            const history = transformTransactionHistory(transactionHistory?.getTokenTransactionHistory);
            setTransfers(history);
        }
    }, [transactionHistory]);

    async function getTokenTransfers() {
        await getTransactionHistory(wallet);
    }

    if (loading) return <CircularIndeterminate />;

    return (
        <>
                <Button onClick={getTokenTransfers} />
                {transfers.length > 0 ? (
                "Table"

            ) :
                (
                    <Label variant="subtitle2">This wallet does not have any historic transactions!</Label>
                )
                }
            </>
    );
}

export default TransferHistory;