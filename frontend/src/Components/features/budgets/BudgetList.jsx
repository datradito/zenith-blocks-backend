import React, { useState, useMemo } from "react";
import Table from "../../molecules/Table/Table";
import Menus from "../../molecules/Menus/Menus";
import BudgetRow from "./BudgetRow";
import Pagination from "../../molecules/Pagination/Pagination";
import CircularIndeterminate from "../../atoms/Loader/loader";

function BudgetList({ isLoading, budgetList }) {
  const [page, setPage] = useState(1);
  const perPage = 5;

  budgetList = budgetList || [];

  const paginatedBudgets = useMemo(() => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return budgetList.slice(start, end);
  }, [page, budgetList]);

  if (isLoading)
    return (
      <>
        <CircularIndeterminate />
      </>
    );

  return (
    <>
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
            data={paginatedBudgets}
            render={(budget) => <BudgetRow budget={budget} key={budget.id} />}
          />
        </Table>
      </Menus>
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(budgetList.length / perPage)}
        onPageChange={setPage}
      />
    </>
  );
}

export default BudgetList;
