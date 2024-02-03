import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { Tooltip, Typography } from "@mui/material";
import List from "../../atoms/List/List";
import styled from "styled-components";
import Label from "../../atoms/Label/Label";
import { DashboardContext } from "../../../Utility/Providers/DashboardProvider";
import WalletStatus from "./Wallet/WalletStatus";
import WalletInfo from "./Wallet/WalletInfo";

const commonListStyles = {
  backgroundColor: "#262942",
  alignItems: "flex-start",
  margin: "0",
  width: "auto",
  padding: "1rem",
  borderRadius: "1.5rem",
};

const AssetsList = styled(List)`
  ${commonListStyles}
`;

function Wallet() {
  const { ensName, address, networkChain, tokensOwnedByUser } =
    useContext(DashboardContext);

  return (
    <List
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="stretch"
      margin="0"
      width="100%"
    >
      <AssetsList>
        <WalletInfo
          address={address}
          ensData={ensName}
          networkChain={networkChain}
        />
      </AssetsList>
      {/* <AssetsList>
        <Label>Assets</Label>
        <WalletStatus tokensOwnedByUser={tokensOwnedByUser} />
      </AssetsList> */}
    </List>
  );
}

export default Wallet;
