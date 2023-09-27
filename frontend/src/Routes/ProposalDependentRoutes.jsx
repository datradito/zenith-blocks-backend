import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useError } from "./ErrorRouterProvider";

const ProposalRoute = () => {
  const { handleError } = useError();
  const { proposal } = useSelector((state) => state.currentProposal);

  useEffect(() => {
    if (proposal === null) {
      handleError({ type: "error", message: "Please select a proposal" });
    }
  }, [handleError, proposal]);

  return proposal ? <Outlet /> : null;
};

export default ProposalRoute;
