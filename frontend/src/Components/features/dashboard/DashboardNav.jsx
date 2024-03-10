import React from "react";
import List from "../../atoms/List/List";
import ContactsIcon from "@mui/icons-material/Contacts";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import styled from "styled-components";
import ClassIcon from "@mui/icons-material/Class";
import useDashboardStore from "../../../store/modules/dashboard/index.ts";

const StyledLink = styled.a`
  text-decoration: none;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;

  gap: 0.5rem;

  &:hover {
    color: #1A65C0;
  }
`;



function DashboardNav() {

  const dashboard = useDashboardStore((state) => state);

  return (
    <List width="100%" alignItems="flex-start" gap="2rem">
      <StyledLink
        onClick={() => dashboard.onChangeActiveTab("wallet")}
        style={{
          color: dashboard.activeTab === "wallet" ? "#1A65C0" : "white",
        }}
      >
        <AccountBalanceWalletIcon />
        Dashboard
      </StyledLink>
      <StyledLink
        onClick={() => dashboard.onChangeActiveTab("categories")}
        style={{
          color: dashboard.activeTab === "categories" ? "#1A65C0" : "white",
        }}
      >
        <ClassIcon />
        Categories
      </StyledLink>
      <StyledLink
        onClick={() => dashboard.onChangeActiveTab("contacts")}
        style={{
          color: dashboard.activeTab === "contacts" ? "#1A65C0" : "white",
        }}
      >
        <ContactsIcon />
        Contacts
      </StyledLink>
    </List>
  );
}

export default DashboardNav;
