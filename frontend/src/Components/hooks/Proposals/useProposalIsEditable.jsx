import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshState } from "../../../actions/createBudgetAction/index.js";
import { toast } from "react-toastify";


const useProposalIsEditable = (proposalId) => {
  const dispatch = useDispatch();
  const { proposals } = useSelector((state) => state.currentProposalAmounts);
  const [amount, setProposalAmount] = useState(null);
  const [status, setStatus] = useState();

  dispatch(refreshState());

  const filteredProposal = useMemo(() => {
    return proposals.filter((proposal) => proposal.id === proposalId)[0];
  }, [proposalId, proposals]);

  useEffect(() => {
    if (filteredProposal) {
      setStatus(filteredProposal.status === "Funded");
      setProposalAmount(filteredProposal.amount);

      if (filteredProposal.status === "Funded") {
        toast.error("Proposal is fully funded");
      } else if (!filteredProposal.amount) {
        toast.error("Proposal is missing an amount");
      }
    }
  }, [filteredProposal]);

  return { amount, status };
};

export default useProposalIsEditable;
