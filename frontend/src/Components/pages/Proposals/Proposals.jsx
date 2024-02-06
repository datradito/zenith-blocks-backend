import React from "react";
import { useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import CircularIndeterminate from "../../atoms/Loader/loader.jsx";
import PaginationControlled from "../../DisplayElements/Pagination.jsx";
import SubHeader from "../../molecules/SubHeader/SubHeader.jsx";
import useProposals from "../../hooks/Proposals/useProposals.jsx";
import ProposalCardMemo from "../../features/proposals/ProposalCard.jsx";
import Container from "../../atoms/Container/Container.jsx";
import { refreshState } from "../../../actions/createBudgetAction/index.js";
import Search from "../../atoms/Search/Search.jsx";
const pagination = {
  margin: "1rem",
  alignItems: "flex-end",
  color: "white",
};

const Proposals = () => {
  const dispatch = useDispatch();
  dispatch(refreshState());

  const {
    syncedAt,
    proposals,
    loading,
    handleSyncProposals,
    handleSkipValueChange,
    handleSearch,
  } = useProposals();

  if (loading) return <CircularIndeterminate />;

  return (
    <Container
      style={{
        border: "none",
        width: "100%",
      }}
    >
      <SubHeader.Container>
        <SubHeader.List>
          <Typography variant="subtitle1">{syncedAt}</Typography>
          <Typography variant="h6">Proposals</Typography>
        </SubHeader.List>
        <SubHeader.List styles={{ flexDirection: "row", gap: "1rem" }}>
          <Search onSearch={handleSearch} />
          <SubHeader.ActionButton label="Sync" onClick={handleSyncProposals} />
        </SubHeader.List>
      </SubHeader.Container>
      <Container
        style={{
          border: "none",
          width: "100%",
        }}
      >
        {proposals?.map((item) => {
          return (
            <Stack
              marginTop={1}
              padding={1}
              key={item.id}
              direction="row"
              justifyContent="flex-start"
            >
              <ProposalCardMemo item={item} />
            </Stack>
          );
        })}
      </Container>
      <PaginationControlled handleSkip={handleSkipValueChange} />
    </Container>
  );
};

export default Proposals;
