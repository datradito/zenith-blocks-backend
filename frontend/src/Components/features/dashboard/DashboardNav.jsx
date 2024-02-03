import React, {useContext} from "react";
import List from "../../atoms/List/List";
import ContactsIcon from "@mui/icons-material/Contacts";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { DashboardContext } from "../../../Utility/Providers/DashboardProvider";
import styled from "styled-components";
import ClassIcon from "@mui/icons-material/Class";

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

  const {handleTabChange, activeTab} = useContext(DashboardContext);

  return (
    <List width="100%" alignItems="flex-start" gap="2rem">
      <StyledLink
        onClick={() => handleTabChange("wallet")}
        style={{
          color: activeTab === "wallet" ? "#1A65C0" : "white",
        }}
      >
        <AccountBalanceWalletIcon />
        Dashboard
      </StyledLink>
      <StyledLink
        onClick={() => handleTabChange("categories")}
        style={{
          color: activeTab === "categories" ? "#1A65C0" : "white",
        }}
      >
        <ClassIcon />
        Categories
      </StyledLink>
      <StyledLink
        onClick={() => handleTabChange("contacts")}
        style={{
          color: activeTab === "contacts" ? "#1A65C0" : "white",
        }}
      >
        <ContactsIcon />
        Contacts
      </StyledLink>
    </List>
  );
}

export default DashboardNav;
