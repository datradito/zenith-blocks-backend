import Proposal from "../../Database/models/Proposal.js";
import Budget from "../../Database/models/Budget.js";
import { GraphQLError } from "graphql";

const proposalResolver = {
  Query: {
    getProposalDetailsById: async (parent, args, context) => {
      const { id } = args;
      try {
        const proposal = await Proposal.findByPk(id);
        return proposal;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    getProposalsByDao: async (parent, args, context) => {
      const { daoid } = args;
      const proposals = await Proposal.findAll({ where: { daoid } });
      return proposals;
    },
    getRemainingProposalAmount: async (parent, args, context) => {
      const { id } = args;
      try {
        const proposal = await Proposal.findByPk(id, {
          attributes: ["amount"],
        });

        return proposal.amount;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    setProposalAmount: async (parent, args, context) => {
      //check if proposal has amount
      console.log(args);

      let proposal = new Proposal({
        id: args.proposal.id,
        amount: args.proposal.amount,
        modifier: args.proposal.modifier,
        daoid: args.proposal.daoid,
        currency: args.proposal.currency,
      });

      try {
        return await proposal.save();
        
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

export default proposalResolver;
