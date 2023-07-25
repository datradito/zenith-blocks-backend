const graphql = require('graphql');
const UserInputError = require('apollo-server');
const { validateInvoice } = require('../validators/validateInvoice.js');
const { insertProposalData } = require('../Database/proposalQuery.js');
const { createGetDataQuery } = require('../Database/getData.js');



const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    //use it when you are dealing with more than one item meeting filter
    GraphQLList,
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLScalarType, Kind
} = graphql;

// const GraphQLString = new GraphQLScalarType({
//     name: 'Date',
//     description: 'Date custom scalar type',
//     serialize(value) {
//         if (value instanceof Date) {
//             return value.getTime(); // Convert outgoing Date to integer for JSON
//         }
//         throw Error('GraphQL Date Scalar serializer expected a `Date` object');
//     },
//     parseValue(value) {
//         if (typeof value === 'number') {
//             return new Date(value); // Convert incoming integer to Date
//         }
//         throw new Error('GraphQL Date Scalar parser expected a `number`');
//     },
//     parseLiteral(ast) {
//         if (ast.kind === Kind.INT) {
//             // Convert hard-coded AST string to integer and then to Date
//             return new Date(parseInt(ast.value, 10));
//         }
//         // Invalid hard-coded value (not an integer)
//         return null;
//     },
// });


// const _ = require('lodash');
//You can also assing ID to graphQLID type from graphql, which allow us to pass string or number for Id, whereas now only string is allowd
//graphQLInt


const InvoiceType = new GraphQLObjectType({
    name: 'Invoice',
    fields: () => ({
        Category: { type: GraphQLString },
        Recipient: { type: GraphQLString },
        InvoiceNumber: { type: GraphQLString },
        Currency: { type: GraphQLFloat },
        InvoiceDate: { type: GraphQLString },
        DueDate: { type: GraphQLString },
        UploadInvoice: { type: GraphQLString },
        Description: { type: GraphQLString },
    }),
});

const BudgetType = new GraphQLObjectType({
    name: 'Budget',
    fields: () => ({
        Id: { type: GraphQLString },
        Category: { type: GraphQLString },
        Amount: { type: GraphQLFloat },
        Currency: { type: GraphQLFloat },
        Breakdown: { type: GraphQLString },
        Proposal: { type: GraphQLString },
        rootPath: { type: GraphQLString },
        Invoices: {
            type: new GraphQLList(InvoiceType),
            resolve(parent, args) {
                return Invoice.find({ budgetId: parent.id })
            }
        },
    })
});

const ProposalType = new GraphQLObjectType({
    name: 'Proposal',
    fields: () => ({
        Id: { type: GraphQLString },
        Amount: { type: GraphQLFloat },
        Modified: { type: GraphQLString },
        Modifier: { type: GraphQLString },
        RootPath: { type: GraphQLString },
        DaoId: { type: GraphQLString },
        Budgets: {
            type: new GraphQLList(BudgetType),
            resolve(parent, args) {
                // return Budget.find({ proposalId: parent.id })
            }
        },
    }),
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        getInvoicesByBudget: {
            type: InvoiceType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return Invoice.findById(args.id);
            }
        },
        getBudgetsByProposal: {
            type: BudgetType,
            args: { proposalId: { type: GraphQLString } },
            resolve(parent, args) {
                // return Budget.findById(args.id);
            }
        },
        getProposalAmountById: {
            type: ProposalType,
            args: { Id: { type: GraphQLString } },
            async resolve(parent, args) {
                // return Proposal.findById(args.id);

                // console.log(args.Id);
                let res = await createGetDataQuery('proposal', 'Id', args.Id);

                const proposals = res[0];

                // Formatting the data to extract the required properties
                // const formattedProposals = res[0]
                //     .filter((proposals) => proposals.length > 0) // Filter out empty arrays
                //     .map((proposals) => {
                //         // Assuming each array contains only one proposal, get the first item
                //         const proposal = proposals[0];
                //         return {
                //             id: proposal.id,
                //             totalamount: parseFloat(proposal.totalamount),
                //         };
                //     });

                // console.log({ Id: res[0].id, Amount: res[0].totalamount });
                console.log({ Id: res[0].id, Amount: res[0].totalamount });
                return {Id: res[0].id, Amount: res[0].totalamount};

            }
        },
    })
});

//Todo: update date and currency filed to correct type in this file and validate  also in front end in serverQueries file

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        submitInvoice: {
            type: InvoiceType,
            args: {
                Category: { type: GraphQLString },
                Recipient: { type: GraphQLString },
                InvoiceNumber: { type: GraphQLString },
                Currency: { type: GraphQLFloat},
                InvoiceDate: { type: GraphQLString },
                DueDate: { type: GraphQLString},
                UploadInvoice: { type: GraphQLString },
                Description: { type: GraphQLString },
            },
            async resolve(parent, args) {
                const { valid, errors } = await validateInvoice(
                    args.Category,
                    args.Recipient,
                    args.InvoiceNumber,
                    args.Currency,
                    args.InvoiceDate,
                    args.DueDate,
                    args.UploadInvoice,
                    args.Description)
                if (!valid) {
                    throw new UserInputError("InvoiceErrors", { errors })
                } else {
                    //TODO: step 1: save invoice to ipfs 
                    //Todo: step 2: save ipfs hash + invoice data to mongo db
                    //Todo: step 3: return ok response with no errors
                    //send ok response with no errors
                    return ({ message: "Invoice submitted successfully" });
                }
                //const userExist = await User.findOne({ email: args.email })
                // if (userExist) {
                //     throw new UserInputError('User Exist with that email', {
                //         errors: {
                //             email: "This email is taken"
                //         }
                //     })
                // } else {
                //     const password = await bcrypt.hash(args.password, 12);
                //     let user = new User({
                //         email: args.email,
                //         username: args.username,
                //         password: password
                //     })
                //     const res = await user.save()
                //     const token = jwtToken(res)

                //     return {
                //         ...res._doc,
                //         id: res._doc._id,
                //         token
                //     }
                // }
            }
        },
        submitBudget: {
            type: BudgetType,
            args: {
                Id: { type: new GraphQLNonNull(GraphQLString) },
                Category: { type: new GraphQLNonNull(GraphQLString) },
                Amount: { type: new GraphQLNonNull(GraphQLFloat) },
                Currency: { type: new GraphQLNonNull(GraphQLFloat) },
                Breakdown: { type: new GraphQLNonNull(GraphQLString) },
                Proposal: { type: new GraphQLNonNull(GraphQLString) },
                rootPath: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                //Todo: get remaining budget amount from mongo db based on proposalId (proposal) and budgetId
                const { valid, errors } = await validateBudget(
                    args.Id,
                    args.Category,
                    args.Amount,
                    args.Currency,
                    args.Breakdown,
                    args.Proposal,
                    remainingBudgetAmount
                )
                if (!valid) {
                    throw new UserInputError("BudgetErrors", { errors })
                } else {
                    //TODO: step 1: save invoice to ipfs 
                    const jsonData = {
                        "id": args.Id,
                        "category": args.Category,
                        "amount": args.Amount,
                        "currency": args.Currency,
                        "breakdown": args.Breakdown,
                        "proposal": args.Proposal,
                        "remainingBudgetAmount": remainingBudgetAmount
                    };
                    const rootPath = args.rootPath;

                    const ipfsResponses = [];
                    for (let data of jsonData) {
                        let ipfsFilePath = rootPath + 'budgetId' + data.id;
                        try {

                            //Todo: Need to implement rate limit in case some items fail to upload
                            const response= await UploadDataToIpfs(ipfsFilePath, data);
                            ipfsResponses.push(response.jsonResponse[0].path);
                        } catch (error) {
                            console.error("Error uploading to IPFS:", error);
                        }
                    }
    
                    //Todo: step 2: save ipfs hash + invoice data to mongo db
                    //send ipfs hash to mongo db

                    //Todo: step 3: return ok response with no errors
                    //send ok response with no errors
                    return ({ message: "budget saved successfully" });
                }
            },
        },
        addOrUpdateProposal: {
            type: ProposalType,
            args: {
                Id: { type: new GraphQLNonNull(GraphQLString) },
                Amount: { type: new GraphQLNonNull(GraphQLFloat) },
                Modifier: { type: new GraphQLNonNull(GraphQLString) },
                RootPath: { type: new GraphQLNonNull(GraphQLString) },
                DaoId: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                // const { valid, errors } = await validateProposal(
                //     args.Id,
                //     args.Title,
                //     args.Body,
                //     args.Amount,
                //     args.Currency,
                //     args.Modified,
                //     args.Status,
                //     args.Modifier
                // )

                let data = {
                    Id: args.Id,
                    Amount: args.Amount,
                    Modified: new Date(),
                    Modifier: args.Modifier,
                    IpfsHash: args.RootPath + 'ProposalId' + args.id,
                    RootPath: args.RootPath,
                    DaoId: args.DaoId
                }

                if (false) {
                    throw new UserInputError("ProposalErrors", { errors })
                } else {

                    //let updatedProposal = await Proposal.findOne({ Id: args.Id });

                    //TODO: step 1: save proposal to ipfs 
                    let ipfsResponse;
                    let savedToIpfs = false;
                    // let ipfsFilePath = rootPath + 'ProposalId' + args.id;
                    // try {
                    //     //Todo: Need to implement rate limit in case some items fail to upload
                    //     const response = await UploadDataToIpfs(ipfsFilePath, data);
                    //     ipfsResponse = response.jsonResponse[0].path;
                    //     savedToIpfs = true;

                    // } catch (error) {
                    //     console.error("Error uploading to IPFS:", error);
                    // }
                    let res = await insertProposalData(data);

                    console.log(res);

                    return { ...data }
                }
            }
        },
    },
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
    context: (req) => ({ req })
})