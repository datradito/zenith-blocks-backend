const { GraphQLFloat, GraphQLInputObjectType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLInt, ApolloError } = require('graphql');

const InvoiceType = require('./typeDefs');
const Invoice = require('../../Database/models/Invoice');
const Budget = require('../../Database/models/Budget');
const InvoiceLines = require('../../Database/models/InvoiceLines');
const UserInputError = require('apollo-server');
const { validateInvoice } = require('../../validators/validateInvoice');

// const InvoiceLine = new GraphQLInputObjectType({
//     name: 'InvoiceLine',
//     fields: () => ({
//         id: { type: GraphQLString },
//         price: { type: GraphQLFloat },
//         quantity: { type: GraphQLFloat },
//         total: { type: GraphQLFloat },
//         notes: { type: GraphQLString },
//     }),
// });


const submitInvoice = {
    type: InvoiceType,
    args: {
        category: { type: new GraphQLNonNull(GraphQLString) },
        recipient: { type: new GraphQLNonNull(GraphQLString) },
        number: { type: new GraphQLNonNull(GraphQLString) },
        currency: { type: new GraphQLNonNull(GraphQLString) },
        total: { type: new GraphQLNonNull(GraphQLFloat) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        duedate: { type: new GraphQLNonNull(GraphQLString) },
        uploadinvoice: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        budgetid: { type: new GraphQLNonNull(GraphQLString) },
        // lines: { type: new GraphQLList(InvoiceLine) }
    },
    async resolve(parent, args) {
        // const { valid, errors } = await validateInvoice(
        //     args.category,
        //     args.recipient,
        //     args.number,
        //     args.currency,
        //     args.date,
        //     args.duedate,
        //     args.uploadinvoice,
        //     args.description,
        //     args.budgetId
        // )
        // if (!valid) {
        //     throw new UserInputError("InvoiceErrors", { errors })
        // } else {
            // TODO: step 1: save invoice to ipfs
            // const jsonData = {
            //     "category": args.category,
            //     "recipient": args.recipient,
            //     "number": args.number,
            //     "currency": args.currency,
            //     "total": args.total,
            //     "date": args.date,
            //     "duedate": args.duedate,
            //     "uploadinvoice": args.uploadinvoice,
            //     "description": args.description,
            //     "budgetid": args.budgetid
            // };
        
        //Todo: for budgetId sent in invoice check total amount for budget
        const invoicedAmount = Invoice.findAll({
            where: {
                budgetid: args.budgetid
            }
        }).then((invoices) => {
            let totalAmount = 0;
            invoices.forEach((invoice) => {
                totalAmount += invoice.total;
            });
            console.log("Total Amount: ", totalAmount);
        });

        const budgetAmount = Budget.findByPk(args.budgetid, {
            attributes: ['amount']
        })

        if (args.total + invoicedAmount < budgetAmount) {
            const invoice = new Invoice({
                ...args,
                ipfs: "ipfsResponse",
            });

            try {
                const savedInvoice = await invoice.save();
                return savedInvoice;
            } catch (error) {
                console.error("Error saving invoice to MySQL:", error);
                throw new ApolloError("Error saving invoice to MySQL.", 'INTERNAL_SERVER_ERROR', { error });
            }
        }

        //Todo: get amount from all invoices for budgetId and check if amount < budgetamount- totalAmount
        //Todo: calculate total amount for currentInvoice for all lines combined. If its less than budget amount then save invoice otherwise throw error
        //Todo: set remaining amount for budgetId = budgetamount - totalAmount
            // let ipfsResponse;

            // let ipfsFilePath = args.rootpath + 'invoiceId' + jsonData.id;
            // try {
            //     const response = await UploadDataToIpfs(ipfsFilePath, jsonData);
            //     ipfsResponse = response.jsonResponse[0].path;
            // } catch (error) {
            //     console.error("Error uploading to IPFS:", error);
            // }
        
    }
}

module.exports = {
    submitInvoice
}