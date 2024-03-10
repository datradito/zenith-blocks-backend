import { create } from "zustand";
import persist from "../../../utils/persist";

enum ProposalStatus {
    Pending = "Pending",
    Approved = "Approved",
    Rejected = "Rejected",
    NotFilled = "NotFilled",
    Filled = "Filled",
    New= "New",
}

interface Proposal {
    id: string;
    title: string;
    status: ProposalStatus;
    amount: number | null;
    space: string;
}

interface ProposalAmount {
    proposalId: string;
    amount: number  | null;
    status: ProposalStatus;
}

interface ProposalStore {
    proposals: Proposal[] | null;
    currentProposal: Proposal | null;
    setCurrentProposal: (proposal: Proposal) => void;
    setAmount: (amount: ProposalAmount) => void;
    setProposals: (proposals: Proposal[]) => void;
    reset: () => void;
}

const initialProposalState = {
    proposals: null,
    currentProposal: null,
};


const useProposalStore = create<ProposalStore>(
    //@ts-ignore
    persist(
        {
            key: "proposal",
            allowlist: ["proposals", "currentProposal"],
        },
        //@ts-ignore
        (set: Function, get: Function) => ({
            ...initialProposalState,
            setProposals: (proposals: Proposal[]) => {
                set(() => ({
                    proposals,
                }));
            },
            setAmount: (amount: ProposalAmount) => {
                const proposal = get().proposals?.find((proposal: Proposal) => proposal.id === amount.proposalId);
                set(() => ({
                    currentProposal: {
                        ...proposal,
                        proposalId: amount.proposalId,
                        amount: amount.amount,
                        status: amount.status,
                    },
                }));
            },
            setCurrentProposal: (currentProposal: Proposal) => {
                console.log("currentProposal", currentProposal);
                set(() => ({
                    currentProposal,
                }));
            },
            reset: async() => {
                await set(() => initialProposalState);
            },
        })
    )
);

export default useProposalStore;
