import Table from "../../molecules/Table/Table";
import Menus from "../../molecules/Menus/Menus";
import { useGetBudgets } from "../../hooks/Budgets/useGetBudgets";
import BudgetRow from "./BudgetRow";
import CircularIndeterminate from "../../atoms/Loader/loader";

function BudgetList({ isLoading, budgetList }) {

  if (isLoading) return (
    <>
      <CircularIndeterminate />
    </>
  );

  return (
    <Menus>
      <Table columns="0.2fr 0.2fr 0.2fr 0.4fr 0.2fr 0.2fr">
        <Table.Header>
          <div>Categories</div>
          <div>Allocated Budget</div>
          <div>Currency</div>
          <div>Breakdown</div>
          <div>Remaining</div>
          <div>Invoices</div>
          {/* <div>Action</div> */}
        </Table.Header>
          <Table.Body
            data={budgetList}
            render={(budget) => <BudgetRow budget={budget} key={budget.id} />}
          />
      </Table>
    </Menus>
  );
}

export default BudgetList;
