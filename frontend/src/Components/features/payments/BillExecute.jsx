import React, { useMemo } from "react";
import Button from "../../atoms/Button/Button";
import { Stack } from "@mui/material";

function BillExecute({ transaction, handleExecute, handleSign, signedByCurrentUser }) {
  const isExecutable = useMemo(() => {
    return (
      transaction.confirmations.length === transaction.confirmationsRequired
    );
  }, [transaction.confirmations.length, transaction.confirmationsRequired]);
  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="flex-end"
      alignItems="center"
      border="none"
      marginTop= "1rem"
    >
      <Button
        onClick={handleSign}
        disabled={signedByCurrentUser}
        variant="contained"
        color="primary"
        padding="0.5rem"
        >
        Sign
      </Button>
      <Button
        onClick={handleExecute}
        disabled={!isExecutable}
        variant="contained"
        padding="0.5rem"
        color="primary"
      >
        Execute
      </Button>
    </Stack>
  );
}

export default BillExecute;
