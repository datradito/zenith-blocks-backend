import React from "react";
import List from "../../../atoms/List/List.jsx";
import ListItem from "../../../atoms/ListItem/ListItem.jsx";
import Label from "../../../atoms/Label/Label.jsx";
import { Avatar } from "@mui/material";
import styled from "styled-components";
import GetEnsName from "../../../molecules/GetEnsName/GetEnsName.jsx";
import ScrollContainer from "../../../atoms/Scroll/ScrollContainer.jsx";

// Define the styled component
const StyledList = styled(List)`
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
`;

const UserBanner = styled(ListItem)`
  flex-direction: row;
  gap: 1rem;
  background-color: rgba(40, 42, 46, 0.2);
  padding-left: 0;
`;

function DetailBillingInfo({ bill }) {
  return (
    <StyledList>
      <div>
        <Label>Bill To</Label>
        <UserBanner>
          <Avatar />
          <ListItem
            style={{
              padding: "0",
            }}
          >
            <GetEnsName address={bill.RecipientAddress} />
            <ScrollContainer>
              <Label>{bill.RecipientAddress}</Label>
            </ScrollContainer>
          </ListItem>
        </UserBanner>
      </div>
      <div>
        <Label>Bill From</Label>

        <UserBanner>
          <Avatar />
          <ListItem
            style={{
              padding: "0",
            }}
          >
            <GetEnsName address={bill.OwnerAddress} />
            <ScrollContainer>
              <Label>{bill.OwnerAddress}</Label>
            </ScrollContainer>
          </ListItem>
        </UserBanner>
      </div>
    </StyledList>
  );
}

export default DetailBillingInfo;
