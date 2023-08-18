const Proposal = require('../../Database/models/Proposal');
const { GraphQLError } = require('graphql');

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
        }
    },
    Mutation: {
        setProposalAmount: async (parent, args, context) => {
            //do some validations here to avoid overwriting amount once its written
            //check if proposal exists
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