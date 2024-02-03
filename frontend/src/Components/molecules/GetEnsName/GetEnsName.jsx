import React from "react";
import Label from "../../atoms/Label/Label";
import { useEnsName } from "wagmi";
import CircularIndeterminate from "../../atoms/Loader/loader";
import { Tooltip } from "@mui/material";

import toast from "react-hot-toast";

function GetEnsName({ address }) {
  const { data, isError, isLoading } = useEnsName({
    address: address,
  });

  isLoading && <CircularIndeterminate />;
  
  isError && toast.error(isError.message);
  return (
    <Tooltip title={data || address}>
      <Label
        style={{
          fontSize: ".95rem",
        }}
      >
        {data || address.slice(0, 6)}...{address.slice(36)}
      </Label>
    </Tooltip>
  );
}

export default GetEnsName;
