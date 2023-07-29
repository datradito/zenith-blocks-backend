const { GraphQLFloat, GraphQLInputObjectType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLInt, input } = require('graphql');

const InvoiceType = require('./typeDefs');
const Invoice = require('../../Database/models/Invoice');
const InvoiceLines = require('../../Database/models/InvoiceLines');
const UserInputError = require('apollo-server');
const { validateInvoice } = require('../../validators/validateInvoice');

const InvoiceLine = new GraphQLInputObjectType({
    name: 'InvoiceLine',
    fields: () => ({
        id: { type: GraphQLString },
        price: { type: GraphQLFloat },
        quantity: { type: GraphQLFloat },
        total: { type: GraphQLFloat },
        notes: { type: GraphQLString },
    }),
});


const submitInvoice = {
    type: InvoiceType,
    args: {
        category: { type: new GraphQLNonNull(GraphQLString) },
        recipient: { type: new GraphQLNonNull(GraphQLString) },
        number: { type: new GraphQLNonNull(GraphQLString) },
        currency: { type: new GraphQLNonNull(GraphQLFloat) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        duedate: { type: new GraphQLNonNull(GraphQLString) },
        uploadinvoice: { type: GraphQLString },
        description: { type: GraphQLString },
        budgetid: { type: new GraphQLNonNull(GraphQLString) },
        lines: { type: new GraphQLList(InvoiceLine) }
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
            const jsonData = {
                "category": args.category,
                "recipient": args.recipient,
                "number": args.number,
                "currency": args.currency,
                "date": args.date,
                "duedate": args.duedate,
                "uploadinvoice": args.uploadinvoice,
                "description": args.description,
                "budgetid": args.budgetid
            };

            // let ipfsResponse;

            // let ipfsFilePath = args.rootpath + 'invoiceId' + jsonData.id;
            // try {
            //     const response = await UploadDataToIpfs(ipfsFilePath, jsonData);
            //     ipfsResponse = response.jsonResponse[0].path;
            // } catch (error) {
            //     console.error("Error uploading to IPFS:", error);
            // }

            // //save invoice to mysql
            const invoice = new Invoice({
                ...jsonData,
                ipfs: "ipfsResponse"
            });
        const savedInvoice = await invoice.save();
        
        //save invoice lines to mysql
        const savedInvoiceLines = await Promise.all(args.lines.map(async (line) => {
            const invoiceLine = new InvoiceLines({
                ...line,
                invoiceid: savedInvoice.id,
                budgetid: args.budgetid
            });
            return await invoiceLine.save();
        }));

        return savedInvoice;
    }
}

module.exports = {
    submitInvoice
}