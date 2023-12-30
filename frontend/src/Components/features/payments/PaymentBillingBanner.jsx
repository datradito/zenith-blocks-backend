// import React from "react";
// import List from "../../atoms/List/List.jsx";
// import ListItem from "../../atoms/ListItem/ListItem.jsx";
// import Label from "../../atoms/Label/Label.jsx";
// import { Avatar } from "@mui/material";
// import styled from "styled-components";
// import GetEnsName from "../../molecules/GetEnsName/GetEnsName.jsx";
// import ScrollContainer from "../../atoms/Scroll/ScrollContainer.jsx";

import React from "react";
import List from "../../atoms/List/List.jsx";
import ListItem from "../../atoms/ListItem/ListItem.jsx";
import Label from "../../atoms/Label/Label.jsx";
import { Avatar } from "@mui/material";
import styled from "styled-components";
import GetEnsName from "../../molecules/GetEnsName/GetEnsName.jsx";
import ScrollContainer from "../../atoms/Scroll/ScrollContainer.jsx";

// Define the styled component
const StyledList = styled(List)`
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  padding-top: 1rem;
  width: 100%;
`;


const UserBanner = styled(ListItem)`
  flex-direction: row;
  gap: 1rem;
  background-color: rgba(40, 42, 46, 0.2);
  padding-left: 0;
  margin-top: 0.5rem;
`;

function PaymentBillingBanner({ paymentData }) {

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
            <GetEnsName address={paymentData.owneraddress} />
            <ScrollContainer>
              <Label >{paymentData.owneraddress}</Label>
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
            <GetEnsName
              address={"0xa0cf798816d4b9b9866b5330eea46a18382f251e"}
            />
            <ScrollContainer>
              <Label>{paymentData.recipient}</Label>
            </ScrollContainer>
          </ListItem>
        </UserBanner>
      </div>
    </StyledList>
  );
}

export default PaymentBillingBanner;

