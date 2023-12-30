import React from 'react'
import { useWaitForTransaction } from 'wagmi';
import { bigIntToString } from '../../../Utility/Logical/bigIntToString'

function TransactionInfo() {
      const { data, isError, isLoading, isSuccess } = useWaitForTransaction({
        hash: "0xde15b1bc2c96b5546092097099404680650b25fc7c1c79fa0b1a930c294396a1",
      });

      if (isLoading) return <div>Processing…</div>;
      if (isError) return <div>Transaction error</div>;
  
    const serializedData = bigIntToString(data);
  // return <div>Transaction: {JSON.stringify(serializedData)}</div>;
   return <div>Transaction</div>;
}

export default TransactionInfo