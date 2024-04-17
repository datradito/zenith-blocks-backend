import Proposal from "../../Database/models/Proposal.js";
import Budget from "../../Database/models/Budget.js";
import { GraphQLError } from "graphql";
import {
  callApi,
  callExternalGraphQLAPI,
} from "../../services/snapshot/callApi.js";

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
      const { daoid, first, skip , title} = args;
      let combinedProposals = [];

      const variables = {
        space: daoid,
        title: title || "",
        skip: skip,
        first: first,
        state: "closed",
      };

      try {
        const {
          data: { proposals },
        } = await callExternalGraphQLAPI(
          "https://hub.snapshot.org/graphql",
          variables
        );

        // Use Promise.all to wait for all promises to resolve
        await Promise.all(
          proposals.map(async (proposal) => {
            let savedProposal = await Proposal.findByPk(proposal.id);
            if (!savedProposal) {
              combinedProposals.push({
                id: proposal.id,
                amount: 0,
                currency: "None",
                daoid: daoid,
                title: proposal.title,
                body: proposal.body,
                status: proposal.state,
                budgets: [],
              });
            } else {
              const { status, ...rest } = savedProposal.dataValues;
              combinedProposals.push({
                ...rest,
                body: proposal.body,
                title: proposal.title,
                status: proposal.state,
              });
            }
          })
        );
      } catch (error) {
        // Re-throw the error to be handled by the caller
        throw new Error(`Network Error: ${error.message}`);
      }

      return combinedProposals;
    },
    // getProposalsByDao: async (parent, args, context) => {
    //   const { daoid } = args;
    //   let mergedProposals = [];

    //   const variables = {
    //     space: daoid,
    //     skip: 0,
    //     first: 20,
    //     state: "closed",
    //   };

    //   try {
    //     const {
    //       data: { proposals },
    //     } = await callExternalGraphQLAPI(
    //       "https://hub.snapshot.org/graphql",
    //       variables
    //     );
    //     try {
    //       proposals.forEach(async (proposal) => {
    //         let savedProposal = await Proposal.findByPk(proposal.id);
    //         if (!savedProposal) {
    //           mergedProposals.push({
    //             id: proposal.id,
    //             amount: 0,
    //             currency: "None",
    //             daoid: daoid,
    //             title: proposal.title,
    //             body: proposal.body,
    //             status: proposal.state,
    //             budgets: [],
    //           });
    //         } else {
    //           const { status, ...rest } = savedProposal.dataValues;
    //           mergedProposals.push({
    //             ...rest,
    //             body: proposal.body,
    //             title: proposal.title,
    //             status: proposal.state,
    //           });
    //         }
    //       });
    //     } catch (error) {
    //       throw new GraphQLError(error.message);
    //     }
    //   } catch (error) {
    //     console.error("Network Error:", error.message);
    //   }

    //   return mergedProposals;
    //   // const proposals = await Proposal.findAll({ where: { daoid } });
    //   // return proposals;
    // },
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
