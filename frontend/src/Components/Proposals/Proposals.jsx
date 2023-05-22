import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_All_PROPOSALS } from '../../SnapShot/Queries.js';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import PaginationControlled from '../DisplayElements/Pagination.jsx';
import { Link } from "react-router-dom";
import SubHeader from "../molecules/SubHeader/SubHeader.jsx"

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
  const [stateQuery, setStateQuery] = useState({ first: 10, skip: 0 });
  const [skipQuery, setSkipQuery] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('currentPage') !== stateQuery.skip) {
      setStateQuery({ ...stateQuery, skip: (parseInt(localStorage.getItem('currentPage'))) * 10 });
      setSkipQuery(false);
    } else {
      setSkipQuery(true);
    }
  }, [skipQuery]);

  const handleSkipValueChange = () => {

    let currentPage = localStorage.getItem("currentPage");
    if (currentPage === 1) {
      setStateQuery({ ...stateQuery, skip: 0 });
    }
    setStateQuery({ ...stateQuery, skip: (parseInt(currentPage) - 1) * 10 });
  };

  const { loading, error, data } = useQuery(GET_All_PROPOSALS, {
    skip: skipQuery,
    variables: { first: parseInt(stateQuery.first), skip: parseInt(stateQuery.skip) }
  });


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.graphQLErrors}</p>;

  const handleExportCSV = () => {
    console.log("Export CSV");
  }

  const handleSyncProposals = () => {
    console.log("Sync Proposals");
  }


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

  return (
    <>
      <SubHeader buttonConfig={componentButtonConfig} currentPath={currentPathConfig} previousPath="Last Sync: 08:25:53 on May, 2023" />
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
                      <ColumnItem sx={label}>Goverance</ColumnItem>
                      <ColumnItem>{item.space.name}</ColumnItem>
                  </SubItem>
                  <SubItem sx={subItemStyle}>
                      <ColumnItem sx={label}>Total Budget</ColumnItem>
                      <ColumnItem>$5,980,000</ColumnItem>
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