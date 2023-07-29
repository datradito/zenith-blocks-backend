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
} = require('graphql');



const InvoiceType = new GraphQLObjectType({
    name: 'Invoice',
    fields: () => ({
        id: { type: GraphQLString },
        category: { type: GraphQLString },
        recipient: { type: GraphQLString },
        number: { type: GraphQLString },
        currency: { type: GraphQLFloat },
        date: { type: GraphQLString },
        duedate: { type: GraphQLString },
        uploadinvoice: { type: GraphQLString },
        description: { type: GraphQLString },
        budgetid: { type: GraphQLString },
    }),
});





module.exports = InvoiceType ;