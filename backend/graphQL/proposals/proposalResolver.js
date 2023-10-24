const Proposal = require('../../Database/models/Proposal');
const Budget = require('../../Database/models/Budget');
const { GraphQLError } = require('graphql');
const { getRemainingProposalAmount } = require('../../Services/Proposals');

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
                return await getRemainingProposalAmount(id);
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        }
    },
    Mutation: {
        setProposalAmount: async (parent, args, context) => {
            //check if proposal has amount
            console.log(args)
            //save proposal to ipfs with jsonData id,amountand daoId
            const jsonData = {
                "id": args.proposal.id,
                "amount": args.proposal.amount,
                "modifier": args.proposal.modifier,
                "daoid": args.proposal.daoid
            };

            let ipfsResponse;

            let ipfsFilePath = args.proposal.rootpath + 'proposalId' + jsonData.id;
            // try {
            //     const response = await UploadDataToIpfs(ipfsFilePath, jsonData);
            //     ipfsResponse = response.jsonResponse[0].path;
            // } catch (error) {
            //     console.error("Error uploading to IPFS:", error);
            // }

            let proposal = new Proposal({
                id: args.proposal.id,
                amount: args.proposal.amount,
                modifier: args.proposal.modifier,
                rootpath: args.proposal.rootpath,
                ipfs: "dummy ipfs",
                daoid: args.proposal.daoid,
            });

            try {
                const user = await proposal.save();;
                return user;
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        }
    }
};


module.exports = proposalResolver;