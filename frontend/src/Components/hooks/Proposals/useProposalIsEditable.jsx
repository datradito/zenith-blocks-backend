import { useEffect, useMemo, useState } from "react";
import { message } from "antd";
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
        //move this to atom as custom warning toast
        // toast.custom(
        //   <p style={{ color: "warning" , padding: "1rem", background: "white", borderRadius: "0.5rem"}}>⚠️ Proposal is fully funded</p>
        // );
      } else if (filteredProposal?.amount === null) {
        message.error("Proposal requires amount")
      }
    }

    if(!filteredProposal) {
      setProposalAmount(null);
      message.error("Proposal requires amount")
    }
  }, []);

  return { amount, status };
};

export default useProposalIsEditable;
