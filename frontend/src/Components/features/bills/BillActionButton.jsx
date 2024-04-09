import React from "react";
import { Button } from "@mui/material";

function BillActionButton() {
  //TODO:impelement logic to determine if button should be sign or execute based on if transaction is ready
    //TODO:to be executed or signed
    const status = "readyToExecute";
    const handleSign = () => {
      console.log("sign");
    };
    const handleExecute = () => {
      console.log("execute");
    };
    return <Button
        variant="contained"
        onClick = {status === "readyToExecute"? handleExecute : handleSign}
    >{
            status === "readyToExecute"? "Pay" : "Sign"
        }</Button>;
}

export default BillActionButton;
