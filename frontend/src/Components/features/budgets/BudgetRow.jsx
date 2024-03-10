import styled from "styled-components";
import CustomizedProgressBars from "../../atoms/ProgressBar/ProgressBar";
import Table from "../../molecules/Table/Table";
import CustomBillsViewIcon from "../../atoms/BillsIcon/BillsIcon";

const ScrollContainer = styled.div`
  max-width: 100%;
  overflow-x: auto;
  text-overflow: ellipsis;
`;

function BudgetRow({ budget }) {

  return (
    <Table.Row>
      <ScrollContainer>{budget.category}</ScrollContainer>
      <ScrollContainer>{budget.amount}</ScrollContainer>
      <ScrollContainer>{budget.currency}</ScrollContainer>
      <ScrollContainer>
        <CustomizedProgressBars value={budget.Breakdown} />
      </ScrollContainer>
      <ScrollContainer>{budget.remaining}</ScrollContainer>
      <ScrollContainer>
        <CustomBillsViewIcon  budget={budget} />
      </ScrollContainer>
    </Table.Row>
  );
}

export default BudgetRow;
