import React from "react";
import { useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import CircularIndeterminate from "../../atoms/Loader/loader.jsx";
import PaginationControlled from "../../DisplayElements/Pagination.jsx";
import SubHeader from "../../molecules/SubHeader/SubHeader.jsx";
import Label from "../../atoms/Label/Label.jsx";
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

  if(loading) return <CircularIndeterminate />;


  return (
    <Container
      style={{
        border: "none",
        paddingTop: "1rem",
      }}
    >
      <SubHeader.Container>
        <SubHeader.List>
          <Label>{syncedAt}</Label>
          <Label variant="subtitle" style={{ color: "white" }}>
            Proposals
          </Label>
        </SubHeader.List>
        <SubHeader.List styles={{ flexDirection: "row", gap: "1rem" }}>
          <Search onSearch={handleSearch} />
          <SubHeader.ActionButton label="Sync Proposals" onClick={handleSyncProposals} />
        </SubHeader.List>
      </SubHeader.Container>
      <Container
        style={{
          border: "none",
        }}
      >
        {proposals?.map((item) => {
          return (
            <Stack
              border={0.05}
              borderRadius={3}
              marginTop={1}
              padding={1}
              borderColor="#BDBDBB"
              direction="row"
              justifyContent="flex-start"
            >
              <ProposalCardMemo item={item} />
            </Stack>
          );
        })}
      </Container>
      <Stack sx={pagination}>
        <PaginationControlled handleSkip={handleSkipValueChange} />
      </Stack>
    </Container>
  );
};

export default Proposals;
