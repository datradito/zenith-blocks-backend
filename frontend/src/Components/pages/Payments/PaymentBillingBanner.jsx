import React from 'react'
import List from "../../atoms/List/List.jsx";
import ListItem from "../../atoms/ListItem/ListItem.jsx";
import Label from "../../atoms/Label/Label.jsx";
import { Avatar } from "@mui/material";

function PaymentBillingBanner( {paymentData}) {
  return (
    <List
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: "1rem",
        padding: "0",
        marginTop: "1rem",
        marginBottom: "1rem",
        backgroundColor: "rgba(40, 42, 46, 0.2)",
      }}
    >
          <ListItem
              
          >
              <Label
              >Bill To
              </Label>

        <List
          style={{
            padding: "0",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
                      justifyContent: "center",
            gap: "1rem",
          }}
        >
          <Avatar
          />
          <List
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "0",
            }}
          >
            <Label
              style={{
                fontSize: ".95rem",
                padding: ".25rem 0",
                color: "white",
              }}
            >
              sdfsdfs
            </Label>
            <Label>dgdsfghsd</Label>
            {/* </ListItem> */}
          </List>
        </List>
      </ListItem>
      <ListItem>
        <Label>Bill From</Label>

        <List
          style={{
            padding: "0",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
                      justifyContent: "center",
            gap: "1rem",
          }}
        >
          <Avatar
          />
          <List
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "0",
            }}
          >
            <Label
              style={{
                fontSize: ".85rem",
                padding: ".25rem 0",
                color: "white",
              }}
            >
              sdfsdfs
            </Label>
            <Label>dgdsfghsd</Label>
            {/* </ListItem> */}
          </List>
        </List>
      </ListItem>
    </List>
  );
}

export default PaymentBillingBanner