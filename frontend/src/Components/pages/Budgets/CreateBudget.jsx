import React from 'react'
import { useSelector } from 'react-redux';

function CreateBudget() {
    const proposal = useSelector(state => state);
  return (
      <div>{JSON.stringify(proposal)}</div>
  )
}

export default CreateBudget