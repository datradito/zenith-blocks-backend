import React, { useEffect, useState } from 'react';
import { NetworkStatus } from '@apollo/client';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import PaginationControlled from '../../DisplayElements/Pagination.jsx';
import SubHeader from "../../molecules/SubHeader/SubHeader.jsx"
import CircularIndeterminate from '../../atoms/Loader/loader.jsx';
import useProposals from '../../hooks/Proposals/useProposals.jsx';
import ProposalCard from './ProposalCard.jsx';
import { useError } from '../../../Routes/ErrorRouterProvider.jsx';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  backgroundColor: '#1A1C1E',
  padding: theme.spacing(0),
  margin: theme.spacing(),
  textAlign: 'center',
}));

const ProposalListCardStyle = {
  width: '90%',
  margin: '1rem auto',
  color: 'white',
};

const pagination = {
  width: '90%',
  margin: '1rem',
  alignItems: 'flex-end',
  color: "white"
}

const currentPathConfig = {
  path: "Proposals",
  // to: `/proposals/${proposal.id}`
}

const Proposals = (props) => {
  const { handleError } = useError();
  const [selectedItemId, setSelectedItemId] = useState(null);

  const {
    loading,
    error,
    data,
    syncedAt,
    handleExportCSV,
    handleSyncProposals,
    handleSkipValueChange,
    networkStatus,
  } = useProposals();

  const onClose = () => {
    setSelectedItemId(null);
  };

  useEffect(() => {
    handleSyncProposals();
  }, []);


  if (networkStatus === NetworkStatus) return <CircularIndeterminate />;
  if (loading) return <CircularIndeterminate />;
  if (error) return handleError({error: "error", message: "Something went wrong! Please try again later."});


  const handleTotalBudgetClick = (itemId, e) => {
    setSelectedItemId(itemId);
  };

  const componentButtonConfig =
    [
      {
        label: "Export CSV",
        variant: "contained",
        onClick: handleExportCSV,
        innerText: "Export CSV",
        backgroundColor: "#282A2E",
      }, {
        label: "Sync Proposals",
        variant: "contained",
        onClick: handleSyncProposals,
        innerText: "Sync Proposals",
        ml: "0.5rem"
      }
    ];

  return (
    <>
      <SubHeader buttonConfig={componentButtonConfig} currentPath={currentPathConfig} previousPath={syncedAt} />
      <Box sx={ProposalListCardStyle}>
        <Stack
          padding={0}
        >
          <Item>
            {
              data.proposals.map((item) => {
                return (
                  <Stack
                    border={.05}
                    borderRadius={3}
                    marginTop={1}
                    padding={1}
                    borderColor='#BDBDBB'
                    direction="row"
                    justifyContent='flex-start'
                  >
                    <ProposalCard item={item} handleTotalBudgetClick={handleTotalBudgetClick} selectedItemId={selectedItemId} onClose={onClose} />
                  </Stack>
                )
              })
            }
          </Item>
        </Stack>
      </Box>
      <Stack sx={pagination}>
        <PaginationControlled
          handleSkip={handleSkipValueChange}
        />
      </Stack>
    </>
  );
};

export default Proposals;