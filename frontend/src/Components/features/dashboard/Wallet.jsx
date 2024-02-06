import React, { useContext } from "react";
import { Stack } from "@mui/material";
import styled from "styled-components";
import { DashboardContext } from "../../../Utility/Providers/DashboardProvider";
import WalletInfo from "./Wallet/WalletInfo";

const AssetsList = styled(Stack)`
  gap: 1rem;
  padding: 1rem;
`;

function Wallet() {
  const { ensName, address, networkChain } = useContext(DashboardContext);

  return (
    <AssetsList>
      <WalletInfo
        address={address}
        ensData={ensName}
        networkChain={networkChain}
      />
    </AssetsList>
  );
}

export default Wallet;
