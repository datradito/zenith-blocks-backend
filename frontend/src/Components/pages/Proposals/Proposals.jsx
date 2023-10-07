import React, { useEffect, useState } from 'react';
import { NetworkStatus } from '@apollo/client';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import PaginationControlled from '../../DisplayElements/Pagination.jsx';
import SubHeader from "../../molecules/SubHeader/SubHeader.jsx"
import CircularIndeterminate from '../../atoms/Loader/loader.jsx';
import Label from '../../atoms/Label/Label.jsx';
import useProposals from '../../hooks/Proposals/useProposals.jsx';
import ProposalCard from './ProposalCard.jsx';
import { useError } from '../../../Routes/ErrorRouterProvider.jsx';
import { toast } from 'react-toastify';
import { Typography } from '@mui/material';


const ProposalListCardStyle = {
  width: '90%',
  margin: '0 auto',
  color: 'white',
};

const pagination = {
  width: '90%',
  margin: '1rem',
  alignItems: 'flex-end',
  color: "white"
}

const Proposals = () => {
  const { handleError } = useError();

  const { loading, error, data, syncedAt, handleExportCSV, handleSyncProposals, handleSkipValueChange, networkStatus } = useProposals();


  if (networkStatus === NetworkStatus) return <CircularIndeterminate />;
  if (loading) return <CircularIndeterminate />;
  if (error) return handleError(toast.error(error.message));


  return (
    <>
      <SubHeader.Container sx={{ paddingTop: "1rem" }}>
        <SubHeader.List
          sx={{
            flexDirection: "column",
            gap: "2.5rem",
          }}
        >
          <Label>{syncedAt}</Label>
          <Typography variant="subtitle" style={{ color: "white" }}>
            Proposals
          </Typography>
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
      <Box sx={ProposalListCardStyle}>
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
      </Box>
      <Stack sx={pagination}>
        <PaginationControlled handleSkip={handleSkipValueChange} />
      </Stack>
    </>
  );
};

export default Proposals;