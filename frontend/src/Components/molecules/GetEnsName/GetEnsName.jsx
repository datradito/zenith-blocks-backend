import React from "react";
import Label from "../../atoms/Label/Label";
import { useEnsName } from "wagmi";
import CircularIndeterminate from "../../atoms/Loader/loader";
import { Tooltip, Typography } from "@mui/material";

import toast from "react-hot-toast";

function GetEnsName({ address }) {
  const { data, isError, isLoading } = useEnsName({
    address: address,
  });

  isLoading && <CircularIndeterminate />;
  
  isError && toast.error(isError.message);
  return (
    <Tooltip title={data || address}>
      <Typography variant="subtitle2">
        {data || address.slice(0, 6)}...{address.slice(36)}
      </Typography>
    </Tooltip>
  );
}

export default GetEnsName;
