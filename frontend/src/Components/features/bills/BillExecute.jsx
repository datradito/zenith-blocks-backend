import React from 'react'
import Button from '../../atoms/Button/Button';

function BillExecute({transaction, handleExecute}) {
  return (
    <>
      {transaction.confirmations.length ===
        transaction.confirmationsRequired && (
        <Button onClick={handleExecute}>Execute</Button>
      )}
    </>
  );
}

export default BillExecute