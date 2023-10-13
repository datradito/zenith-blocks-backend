import React from "react";
import { NetworkStatus } from "@apollo/client";
import Stack from "@mui/material/Stack";
import PaginationControlled from "../../DisplayElements/Pagination.jsx";
import SubHeader from "../../molecules/SubHeader/SubHeader.jsx";
import CircularIndeterminate from "../../atoms/Loader/loader.jsx";
import Label from "../../atoms/Label/Label.jsx";
import useProposals from "../../hooks/Proposals/useProposals.jsx";
import ProposalCard from "./ProposalCard.jsx";
import { toast } from "react-toastify";
import Container from "../../atoms/Container/Container.jsx";

const pagination = {
  margin: "1rem",
  alignItems: "flex-end",
  color: "white",
};

const Proposals = () => {
  const {
    loading,
    error,
    data,
    syncedAt,
    handleSyncProposals,
    handleSkipValueChange,
    networkStatus,
  } = useProposals();

  if (networkStatus === NetworkStatus) return <CircularIndeterminate />;
  if (loading) return <CircularIndeterminate />;
  if (error) toast.error(error.message);

  return (
    <Container
      style={{
        width: "90%",
        border: "none",
        paddingTop: "1rem",
      }}
    >
      <SubHeader.Container sx={{ paddingTop: "1rem" }}>
        <SubHeader.List
          sx={{
            flexDirection: "column",
            gap: "2.5rem",
          }}
        >
          <Label>{syncedAt}</Label>
          <Label variant="subtitle" style={{ color: "white" }}>
            Proposals
          </Label>
        </SubHeader.List>
        <SubHeader.List>
          <SubHeader.ActionButton
            label="CSV Report"
            sx={{
              backgroundColor: "#282A2E",
            }}
          />
          <SubHeader.ActionButton
            label="Sync Proposals"
            onClick={handleSyncProposals}
          />
        </SubHeader.List>
      </SubHeader.Container>
      <Container
        style={{
          border: "none",
        }}
      >
        {data.proposals.map((item) => {
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
              <ProposalCard item={item} />
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
