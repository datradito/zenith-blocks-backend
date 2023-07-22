import React, {useState} from 'react';
import { NetworkStatus } from '@apollo/client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import PaginationControlled from '../DisplayElements/Pagination.jsx';
import { Link } from "react-router-dom";
import SubHeader from "../molecules/SubHeader/SubHeader.jsx"
import CircularIndeterminate from '../atoms/Loader/loader.jsx';
import useProposals from '../hooks/useProposals.jsx';
import CustomActionIcon from '../atoms/ActionIcon/CustomActionIcon.jsx';
import { Typography } from '@mui/material';
import FormDetailPanel from '../atoms/EditDetails/EditDetailsProposal.jsx';
import { on } from 'events';

const ProposalListCardStyle = {
  width: '90%',
  margin: '1rem auto',
  color: 'white',
};

const label = {
  color: 'Gray',
  fontSize: '.65rem'
}

const pagination = {
  width: '90%',
  margin:'1rem',
  alignItems: 'flex-end',
  color: "white"
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  backgroundColor: '#1A1C1E',
  padding: theme.spacing(0),
  margin: theme.spacing(),
  textAlign: 'center',
}));

const SubItem = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1A1C1E',
  padding: theme.spacing(1),
  margin: theme.spacing(.5),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
}));

const ColumnItem = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1A1C1E',
  textAlign: 'left',
  color: 'white',
  boxShadow: 'none',
  fontSize: '.85rem'
}));


const subItemStyle = {
  minWidth: 200,
}


const Proposals = () => {
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


  if (networkStatus === NetworkStatus.refetch) return <CircularIndeterminate />;
  if (loading) return <CircularIndeterminate /> ;
  if (error) return <p>Error : {error.graphQLErrors}</p>;

  const handleTotalBudgetClick = (itemId, e) => {
    setSelectedItemId(itemId);
    console.log("Clicked element:", selectedItemId);
    onClose();
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

  const currentPathConfig = {
    path: "Proposals",
    // to: `/proposals/${proposal.id}`
  }

  const onClose = () => {
    setSelectedItemId(null);
  };

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
                  padding = {1}
                  borderColor='#BDBDBB'
                  direction="row"
                  justifyContent='flex-start'
                >
                  <SubItem sx={subItemStyle}>
                      <ColumnItem sx={label}>Governance</ColumnItem>
                      <ColumnItem>{item.space.name}</ColumnItem>
                  </SubItem>
                    <SubItem sx={subItemStyle}
                      onClick={() => handleTotalBudgetClick(item.id)}
                    >
                      <ColumnItem sx={label}>Total Budget</ColumnItem>
                      <ColumnItem>
                        {item.totalBudget ? item.totalBudget :
                          selectedItemId !== item.id ?
                            <CustomActionIcon /> :
                            <FormDetailPanel row={data.proposals.find((row) => row.id === selectedItemId)} onClose={onClose} />
                              // selectedItemId != item.id ?
                              //   <CustomActionIcon /> :
                              //   <FormDetailPanel row={data.proposals.find((row) => row.id === selectedItemId)} onClose={onClose} /> 
                        }

                      </ColumnItem>
                    </SubItem>
                  <SubItem >
                      <Link to={`/proposals/${item.id}`} style={{ textDecoration: 'none' }}>
                        <ColumnItem sx={label}>Proposal</ColumnItem>
                        <ColumnItem>{item.title}</ColumnItem>
                      </Link>
                  </SubItem>
                </Stack> 
                )
              })
          }
          </Item>
        </Stack>
      </Box>
      <Stack sx={pagination}>
        <PaginationControlled
            handleSkip = {handleSkipValueChange}
        />
      </Stack>
    </>
  );
};

export default Proposals;