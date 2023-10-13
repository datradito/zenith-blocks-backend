import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";


const useProposalIsEditable = (proposalId) => {
  const { proposals } = useSelector((state) => state.currentProposalAmounts);
  const [amount, setProposalAmount] = useState(null);
  const [status, setStatus] = useState();

const filteredProposal = useMemo(() => {
  const foundProposal = proposals.find(
    (proposal) => proposal.id === proposalId
  );
  return foundProposal || null;
}, [proposalId, proposals]);


  useEffect(() => {
    if (filteredProposal) {
      setStatus(filteredProposal.status === "Funded");
      setProposalAmount(filteredProposal.amount);

      if (filteredProposal.status === "Funded") {
        toast.error("Proposal is fully funded");
      } else if (filteredProposal?.amount === null) {
        toast.error("Proposal is missing an amount");
      }
    }

    if(!filteredProposal) {
      setProposalAmount(null);
      toast.error("Proposal is missing an amount");
    }
  }, []);

  return { amount, status };
};

export default useProposalIsEditable;
