import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

const ProposalRoute = () => {
  const { proposal } = useSelector((state) => state.currentProposal);

  useEffect(() => {
    if (proposal === null) {
      throw new Error("Proposal not found");
    }
  }, [proposal]);
  return proposal ? <Outlet /> : null;
};

export default ProposalRoute;
