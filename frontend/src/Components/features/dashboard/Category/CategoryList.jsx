import React, { useContext, useMemo, useState } from "react";
import Label from "../../../atoms/Label/Label";
import Table from "../../../molecules/Table/Table";
import { DashboardContext } from "../../../../Utility/Providers/DashboardProvider";
import CategoryRow from "./CategoryRow";
import Pagination from "../../../molecules/Pagination/Pagination";

function CategoryList() {
  const { categories } = useContext(DashboardContext);

  const [page, setPage] = useState(1);
  const perPage = 5;

  const paginatedCategories = useMemo(() => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return categories.slice(start, end);
  }, [page, categories]);

  return (
    <>
      <Table columns="0.5fr 1.5fr">
        <Table.Header>
          <Label></Label>
          <Label>Name</Label>
        </Table.Header>
        <Table.Body
          data={paginatedCategories}
          render={(category, index) => {
            return (
              <CategoryRow key={index} category={category} index={index} />
            );
          }}
        />
      </Table>
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(categories.length / perPage)}
        onPageChange={setPage}
      />
    </>
  );
}

export default CategoryList;