import { Typography } from '@mui/material';
import React from 'react'


function BillConfirmations({transaction}) {
  return (
    <div>
      <Typography>Confirmation Required : {transaction.confirmationsRequired}</Typography>
      {transaction.confirmations.map((confirmation) => (
        <div key={confirmation.owner}>
          <Typography>Signed By: {confirmation.owner}</Typography>
        </div>
      ))}
    </div>
  );
}

export default BillConfirmations