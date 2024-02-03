import React from "react";
import Table from "../../../molecules/Table/Table";
import Label from "../../../atoms/Label/Label";
import AssetLogo from "../../../molecules/Swap/AssetLogo";

function CategoryRow({ category, index }) {
  return (
    <Table.Row>
      <Label>{index + 1}</Label>
      {/* <AssetLogo src={category.logo} alt="categoryLogo" /> */}
      <Label color="white" fontSize="1rem">
        {category.name}
      </Label>
      {/* <Label>{category.symbol}</Label>
      <Label>{category.balance}</Label> */}
    </Table.Row>
  );
}

export default CategoryRow;
