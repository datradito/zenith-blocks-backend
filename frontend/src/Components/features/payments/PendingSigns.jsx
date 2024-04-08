import React from "react";
import { Tooltip } from "antd";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import Table from "../../molecules/Table/Table";
import MaxLabel from "../../molecules/Swap/MaxLabel";
import StatusChip from "../../atoms/StatusChip/StatusChip";
import Label from "../../atoms/Label/Label";
import AddressLabel from "../safe/AddressLabel";

function PendingSigns({ owners }) {
  return (
    <div>
      <MaxLabel>Pending Signatures</MaxLabel>
      <>
        <Table columns="0.01fr 3fr 1.4fr 1fr">
          <Table.Header padding="0.25rem 2.4rem">
            <p></p>
            <Label>Signer</Label>
            <Label>Status</Label>
          </Table.Header>
          <Table.Body
            data={[owners]}
            render={() => {
              return owners.map((signer, index) => (
                <Table.Row>
                  <div>{index + 1}</div>
                  <AddressLabel address={signer} />
                  <StatusChip status="Pending" />
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Tooltip title="Send Reminder">
                      <NotificationsNoneIcon />
                    </Tooltip>
                  </div>
                </Table.Row>
              ));
            }}
          />
        </Table>
      </>
    </div>
  );
}

export default PendingSigns;
