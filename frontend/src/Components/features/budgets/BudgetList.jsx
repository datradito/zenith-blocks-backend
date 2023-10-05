import Table from "../../molecules/Table/Table";
import Menus from "../../molecules/Menus/Menus";
import { useSearchParams } from "react-router-dom";
import EmptyIcon from "../../atoms/EmptyIcon/EmptyIcon";
import BudgetRow from "./BudgetRow";

function BudgetList({ isLoading, budgets }) {
  //   const [searchParams] = useSearchParams();

  //   if (!budgets.length) return <EmptyIcon />;

  //   // 1) FILTER
  //   const filterValue = searchParams.get("discount") || "all";

  //   let filteredbudgets;
  //   if (filterValue === "all") filteredbudgets = budgets;
  //   if (filterValue === "no-discount")
  //     filteredbudgets = budgets.filter((budget) => budget.amount === 0);
  //   if (filterValue === "with-discount")
  //     filteredbudgets = budgets.filter((budget) => budget.amount > 0);

  //   // 2) SORT
  //   const sortBy = searchParams.get("sortBy") || "startDate-asc";
  //   const [field, direction] = sortBy.split("-");
  //   const modifier = direction === "asc" ? 1 : -1;
  //   const sortedbudgets = filteredbudgets.sort(
  //     (a, b) => (a[field] - b[field]) * modifier
  //   );
  console.log("budgets", budgets);

  return (
    <Menus>
      <Table columns="0.2fr 0.2fr 0.2fr 0.4fr 0.2fr 0.2fr 0.1fr">
        <Table.Header>
          <div>Categories</div>
          <div>Allocated Budget</div>
          <div>Currency</div>
          <div>Breakdown</div>
          <div>Remaining</div>
                  <div>Invoices</div>
                  <div>Action</div>
        </Table.Header>

        <Table.Body
          data={budgets}
          // data={filteredCabins}
          //   data={sortedInvoices}
          render={(budget) => (
            <BudgetRow budget={budget} key={budget.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BudgetList;
