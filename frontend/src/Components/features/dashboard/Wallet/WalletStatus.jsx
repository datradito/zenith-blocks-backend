import React, { useContext, useMemo, useState } from "react";
import Label from "../../../atoms/Label/Label";
import Table from "../../../molecules/Table/Table";
import TokensRow from "./TokensRow";
import { DashboardContext } from "../../../../Utility/Providers/DashboardProvider";
import Pagination from "../../../molecules/Pagination/Pagination";

function WalletStatus() {
  const { tokensOwnedByUser } = useContext(DashboardContext);

  const [page, setPage] = useState(1);
  const perPage = 5;

  const memoizedTokenList = useMemo(() => {
    return tokensOwnedByUser || [];
  }, [tokensOwnedByUser]);

  const paginatedTokens = useMemo(() => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return memoizedTokenList.slice(start, end);
  }, [page, memoizedTokenList]);

  return (
    <>
      <Table columns="0.5fr 0.5fr 1.5fr 1fr 1fr">
        <Table.Header>
          <Label></Label>
          <Label></Label>
          <Label>Name</Label>
          <Label>Symbol</Label>
          <Label>Balance</Label>
        </Table.Header>
        <Table.Body
          data={paginatedTokens}
          render={(token, index) => {
            return <TokensRow key={index} token={token} index={index} />;
          }}
        />
      </Table>
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(memoizedTokenList.length / perPage)}
        onPageChange={setPage}
      />
    </>
  );
}

export default WalletStatus;
