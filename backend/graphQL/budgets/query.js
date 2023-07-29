const Invoice = require('../../Database/models/Invoice');
const BudgetType = require('./typeDefs');
const { GraphQLString, GraphQLList } = require('graphql');
const Budget = require('../../Database/models/Budget')

const getBudgetById = {
    type: BudgetType,
    args: { id: { type: GraphQLString } },
    resolve(parent, args) {
        return Budget.findByPk(args.id, {
            include: [{
                model: Invoice,
                as: 'invoices'
            }]
        });
    }
}

const getBudgetsForProposal = {
    type: new GraphQLList(BudgetType),
    args: { proposalid: { type: GraphQLString } },
    resolve: async (parent, args) => {
        return await Budget.findAll({
            where: { proposalid: args.proposalid }
        }, {
            sort: {
                createdAt: 'desc'
            },
            include: [{
                model: Invoice,
                as: 'invoices'
            }]
        });
    }
}

module.exports = {
    getBudgetById,
    getBudgetsForProposal,
}