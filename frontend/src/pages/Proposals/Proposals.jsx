import React from "react";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import CircularIndeterminate from "../../Components/atoms/Loader/loader.jsx";
import SubHeader from "../../Components/molecules/SubHeader/SubHeader.jsx";
import useProposals from "../../Components/hooks/Proposals/useProposals.jsx";
import ProposalCardMemo from "../../Components/features/proposals/ProposalCard.jsx";
import Container from "../../Components/atoms/Container/Container.jsx";
import Search from "../../Components/atoms/Search/Search.jsx";
import Pagination from "../../Components/molecules/Pagination/Pagination.jsx";

const Proposals = () => {
  const perPage = 5;
  const {
    syncedAt,
    count,
    loading,
    handleSyncProposals,
    handleSearch,
    currentPage,
    setCurrentPage,
    paginatedProposals,
  } = useProposals();
  
  if (loading) return <CircularIndeterminate />;
  return (
    <Container border="none">
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
        {paginatedProposals?.map((proposal) => {
          return (
            <Stack
              marginTop={1}
              padding={1}
              key={proposal.id}
              direction="row"
              justifyContent="flex-start"
            >
              <ProposalCardMemo proposal={proposal} />
            </Stack>
          );
        })}
      </Container>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(count/ perPage)}
        onPageChange={setCurrentPage}
      />
    </Container>
  );
};

export default Proposals;
