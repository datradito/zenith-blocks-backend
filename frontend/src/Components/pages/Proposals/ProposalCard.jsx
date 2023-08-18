import React from 'react'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import FormDetailPanel from '../../atoms/EditDetails/EditDetailsProposal.jsx';
import Amount from '../../molecules/ProposalAmount/Amount.jsx';


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

const label = {
    color: 'Gray',
    fontSize: '.65rem'
}

function ProposalCard({ item, selectedItemId, handleTotalBudgetClick, onClose }) {
    
  return (
      <>
          <SubItem sx={subItemStyle}>
              <ColumnItem sx={label}>Governance</ColumnItem>
              <ColumnItem>{item.space.name}</ColumnItem>
          </SubItem>
          <SubItem sx={subItemStyle}
          // onClick={() => handleTotalBudgetClick(item.id)}
          >
              <ColumnItem sx={label}>Total Budget</ColumnItem>
              <ColumnItem>
                  {selectedItemId === item.id ? (
                      <FormDetailPanel row={item} onClose={onClose} />
                  ) : (
                      <Amount proposalid={item.id} key={selectedItemId} onClick={() => handleTotalBudgetClick(item.id)} />
                  )}
              </ColumnItem>
          </SubItem>
          <SubItem >
              <Link to={`/proposals/${item.id}`} style={{ textDecoration: 'none' }}>
                  <ColumnItem sx={label}>Proposal</ColumnItem>
                  <ColumnItem>{item.title}</ColumnItem>
              </Link>
          </SubItem>
      </>
  )
}

export default ProposalCard