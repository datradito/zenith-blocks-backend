import Container from "../../atoms/Container/Container";
import React, { useContext } from "react";
import styled from "styled-components";
import GetTransactions from "./GetTransactions";
import DashboardNav from "./DashboardNav";
import { Avatar, Stack, Typography } from "@mui/material";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import Wallet from "./Wallet";
import { DashboardContext } from "../../../Utility/Providers/DashboardProvider";
import WalletStatus from "./Wallet/WalletStatus";
import CategoryList from "./Category/CategoryList";
import ContactsList from "./Contacts/ContactsList";

const StyledContainer = styled(Container)`
  margin: 0;
  gap: 1rem;
  padding: 0;
  border: ${(props) => props.border || "none"};
  flex: ${(props) => props.flex || "1"};
`;

const NavPanel = ({ children }) => {
  return (
    <Container border="none">
      <Avatar
        src="https://twitter.com/Balancer/photo"
        alt="Dao logo"
        style={{ marginBottom: "5rem" }}
      />
      <DashboardNav />
    </Container>
  );
};

const RightPanel = () => {
  const { activeTab } = useContext(DashboardContext);
  return (
    <StyledContainer flex={6} border="2px solid rgba(40, 42, 46, 0.5)">
      {activeTab === "wallet" && <GetTransactions />}
      {activeTab === "categories" && <CategoryList />}
      {activeTab === "contacts" && <ContactsList />}
    </StyledContainer>
  );
};

const ConnectedWalletInfo = ({ children }) => {
  return (
    <Stack width="100%" alignItems="flex-start" border="none" background="">
      <Wallet />
    </Stack>
  );
};

const LeftPanel = () => {
  return (
    <StyledContainer
      flex={3}
      style={{
        padding: "1rem",
        margin: "0",
        justifyContent: "flex-start",
      }}
    >
      <Container
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
        margin="0"
        gap="1rem"
        border="none"
      >
        <SwapHorizontalCircleIcon />
        <Typography variant="h6">Transactions</Typography>
      </Container>
      {/* <GetTransactions /> */}
    </StyledContainer>
  );
};

const BottomPanel = () => {
  return (
    <Stack flexDirection="row" gap={2} alignItems="stretch" border="none">
      <RightPanel />
      <LeftPanel />
    </Stack>
  );
};

const MainPanel = () => {
  return (
    <Container border="none" flexDirection="column" width="100%" gap="2rem">
      <ConnectedWalletInfo />
      <BottomPanel />
    </Container>
  );
};

function DashboardLayout({ children }) {
  return (
    <Container border="none" flexDirection="row" gap="2rem">
      <NavPanel />
      <MainPanel />
    </Container>
  );
}

export default DashboardLayout;
