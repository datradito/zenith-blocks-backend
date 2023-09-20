import React from 'react'
import { useWaitForTransaction } from 'wagmi';

const bigIntToString = (obj) => {
  return JSON.stringify(obj, (key, value) => {
    return typeof value === "bigint" ? value.toString() : value;
  });
};  

function TransactionInfo() {
      const { data, isError, isLoading, isSuccess } = useWaitForTransaction({
        hash: "0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060",
      });

      if (isLoading) return <div>Processing…</div>;
      if (isError) return <div>Transaction error</div>;
  
  const serializedData = bigIntToString(data);
  console.log(isSuccess)

  console.log(serializedData);
      return <div>Transaction: {JSON.stringify(serializedData)}</div>;
}

export default TransactionInfo