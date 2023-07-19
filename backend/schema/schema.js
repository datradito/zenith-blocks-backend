const graphql = require('graphql');
// const Book = require("../models/bookModel")
// const Author = require("../models/authorModel")
// const User = require("../models/userModel")
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")
const { UserInputError } = require('apollo-server');
const validateInvoice  = require("../validators/validate.js");
// const { checkAuth } = require("../utils/chekAuth.js")
// const SECRET = process.env.SECRET_KEY


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

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        invoice: {
            type: GraphQLString,
            resolve() {
                return "Invoice Query";
            }
        }
    })
});

//Todo: update date and currency filed to correct type in this file and validate  also in front end in serverQueries file

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        submitInvoice: {
            type: InvoiceType,
            args: {
                Category: { type: new GraphQLNonNull(GraphQLString) },
                Recipient: { type: new GraphQLNonNull(GraphQLString) },
                InvoiceNumber: { type: new GraphQLNonNull(GraphQLString) },
                Currency: { type: new GraphQLNonNull(GraphQLFloat) },
                InvoiceDate: { type: new GraphQLNonNull(GraphQLString) },
                DueDate: { type: new GraphQLNonNull(GraphQLString)},
                UploadInvoice: { type: new GraphQLNonNull(GraphQLString) },
                Description: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {

                console.log(args)
                const {valid, errors} = await validateInvoice(args.Category, args.Recipient, args.InvoiceNumber, args.Currency, args.InvoiceDate, args.DueDate, args.UploadInvoice, args.Description)
                if (!valid) {
                    throw new UserInputError("Erros", { errors })
                } else {
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
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
    context: (req) => ({ req })
})