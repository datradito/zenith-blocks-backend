import Container from "../../atoms/Container/Container";
import React, { useContext} from "react";
import List from "../../atoms/List/List";
import styled from "styled-components";
import GetTransactions from "./GetTransactions";
import DashboardNav from "./DashboardNav";
import { Avatar } from "@mui/material";
import Label from "../../atoms/Label/Label";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import Wallet from "./Wallet";
import { DashboardContext } from "../../../Utility/Providers/DashboardProvider";
import WalletStatus from "./Wallet/WalletStatus";
import CategoryList from "./Category/CategoryList";
import ContactsList from "./Contacts/ContactsList";


const commonPanelStyles = {
  padding: "1rem",
  border: "none",
  width: "100%",
  margin: "0",
};

const PanelContainer = styled(Container)`
  ${commonPanelStyles}
`;

const NavPanel = ({ children }) => {
  return (
    <PanelContainer
      style={{
        flex: 1,
        backgroundColor: "transparent",
      }}
    >
      <Avatar
        src="https://twitter.com/Balancer/photo"
        alt="Dao logo"
        style={{ marginBottom: "5rem" }}
      />
      <DashboardNav />
    </PanelContainer>
  );
};

const RightPanel = () => {
const { activeTab } = useContext(DashboardContext);
  return (
    <PanelContainer
      style={{
        flex: 8,
        backgroundColor: "#262942",
      }}
    >
      {activeTab === "wallet" && <WalletStatus />}
      {activeTab === "categories" && <CategoryList />}
      {activeTab === "contacts" &&  <ContactsList />}
    </PanelContainer>
  );
};

const ConnectedWalletInfo = ({ children }) => {
  return (
    <List width="100%" alignItems="flex-start">
      <Wallet />
    </List>
  );
};

const LeftPanel = () => {
  return (
    <PanelContainer
      style={{
        flex: 2,
        backgroundColor: "#262942",
      }}
    >
      <List flexDirection="row" justifyContent="flex-start">
        <SwapHorizontalCircleIcon />
        <Label fontSize="1.2rem" color="white">
          Transactions
        </Label>
      </List>
      <GetTransactions />
    </PanelContainer>
  );
};

const BottomPanel = () => {
  return (
    <List
      flexDirection="row"
      margin="0"
      width="100%"
      alignItems="stretch"
      padding="0"
    >
      <RightPanel />
      <LeftPanel />
    </List>
  );
};

const MainPanelContainer = styled(PanelContainer)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0rem;
  flex: 10;
  border-radius: 1.5rem;
`;

const MainPanel = () => {
  return (
    <MainPanelContainer>
      <ConnectedWalletInfo />
      <BottomPanel />
    </MainPanelContainer>
  );
};

const DashboardLayoutContainer = styled(PanelContainer)`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  gap: 1rem;
  border: none;
  border-radius: 1.5rem;
  align-items: stretch;
  background-color: #1b1d32;
  margin-top: 4rem;
`;

function DashboardLayout({ children }) {
  return (
    <DashboardLayoutContainer>
      <NavPanel />
      <MainPanel />
    </DashboardLayoutContainer>
  );
}

export default DashboardLayout;
