import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";

const useCurrentProposalDetail = () => {
  const { proposal } = useSelector((state) => state.currentProposal);
  const { proposals } = useSelector((state) => state.currentProposalAmounts);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    Goverance: "",
    "Total Budget": 0,
    Proposal: "",
  });

  const filteredProposal = useMemo(() => {
    return proposals.find((item) => item.id === proposal.id) || null;
  }, [proposals, proposal.id]);


  useEffect(() => {
    if (proposal) {
      setLoading(false); // Data is ready, stop loading
      const updatedDataForItemCard = {
        ...data,
        Goverance: proposal.space,
        Proposal: proposal.title,
        "Total Budget": filteredProposal?.amount || 0,
      };
      setData(updatedDataForItemCard);
    }
  }, [data, filteredProposal, proposal]);

  return { data, loading };
};

export default useCurrentProposalDetail;
