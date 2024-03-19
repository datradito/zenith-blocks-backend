import React from "react";
import BillRow from "./BillRow";
import Table from "../../molecules/Table/Table";
import Container from "../../atoms/Container/Container";
import CustomPDFViewIcon from "../../atoms/PdfIcon/padfIcon";
import styled from "styled-components";

const PdfContainer = styled(Container)`
  border: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
`;

function BillList({ bill }) {

  return (
    <Container
      width="100%"
    >
      <Table columns="0.4fr 0.4fr 0.4fr">
        <Table.Header>
          <div>Category</div>
          <div>Amount</div>
          <div>Currency</div>
        </Table.Header>

        <Table.Body
          data={[bill]}
          render={() => {
            return <BillRow bill={bill} />;
          }}
        />
      </Table>
      <PdfContainer>
        <CustomPDFViewIcon label="Download PDF" />
      </PdfContainer>
    </Container>
  );
}

export default BillList;
