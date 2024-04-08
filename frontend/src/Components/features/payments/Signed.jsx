import Table from "../../molecules/Table/Table";
import React from "react";
import StatusChip from "../../atoms/StatusChip/StatusChip";
import Label from "../../atoms/Label/Label";
import MaxLabel from "../../molecules/Swap/MaxLabel";
import AddressLabel from "../safe/AddressLabel";

function Signed({ signed }) {
  console.log(signed.length);
  return (
    <div>
      <MaxLabel
      >
        Signed By
      </MaxLabel>
      {signed.length === 0 ? (
        <Label>No Signatures yet!</Label>
      ) : (
        <Table columns="0.01fr 3fr 1.4fr 1fr">
          <Table.Header padding="0.25rem 2.4rem">
            <p></p>
            <Label>Signer</Label>
            <Label>Status</Label>
          </Table.Header>
          <Table.Body
            data={signed}
            render={() => {
              return signed.map((signer, index) => (
                <Table.Row>
                  <div>{index + 1}</div>
                  <AddressLabel address={signer} />
                  <StatusChip status="Signed" />
                </Table.Row>
              ));
            }}
          />
        </Table>
      )}
    </div>
  );
}

export default Signed;
