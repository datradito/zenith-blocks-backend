import React from 'react'
import Label from '../../atoms/Label/Label';


function BillConfirmations({transaction}) {
  return (
    <div>
      <Label>Confirmations Required : {transaction.confirmationsRequired}</Label>
    </div>
  );
}

export default BillConfirmations