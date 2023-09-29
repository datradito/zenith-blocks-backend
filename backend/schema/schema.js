const { ApolloServer } = require("@apollo/server");
const proposalResolver = require("../graphQL/proposals/proposalResolver");
const invoiceResolver = require("../graphQL/invoices/invoiceResolver");
const budgetResolver = require("../graphQL/budgets/budgetResolver");
const paymentsResolver = require("../graphQL/payments/paymentsResolver");
const Invoice = require("../Database/models/Invoice");

const typeDefs = `#graphql
    type Budget {
        id: String
        category: String
        amount: Float
        currency: String
        breakdown: Float
        proposalid: String
        rootpath: String
        remaining: Float
        ipfs: String
        invoices: [Invoice]
    }

    type Proposal {
        id: String
        amount: Float
        modified: String
        status: String
        modifier: String
        rootpath: String
        daoid: String
        budgets: [Budget]
    }

    type Invoice {
        id: String
        category: String
        recipient: String
        owneraddress: String
        number: String
        currency: String
        total: Float
        date: String
        duedate: String
        uploadinvoice: String
        description: String
        budgetid: String
        status: String
    }
    type Payment {
        id: String!
        recipient: String!
        owneraddress: String!
        invoiceid: String!
        proposalid: String
        currency: String!
        total: Float!
        status: String!
        transactionHash: String
        budgetid: String!
    }

    type Query {
        getBudgetById(id: String): Budget,
        getBudgetsForProposal(proposalid: String): [Budget],
        getInvoiceById(id: String): Invoice,
        getInvoicesByBudget(budgetid: String): [Invoice],
        getProposalDetailsById(id: String): Proposal,
        getProposalsByDao(daoid: String): [Proposal],
        getPaymentByInvoiceId(invoiceid: String!): Payment
        getAllPayments: [Payment!]!
        getRemainingBudgetAmount(budgetid: String!): Float
    }
    type Mutation {
        submitBudget(budget: BudgetInput): Budget,
        submitInvoice(invoice: InvoiceInput): Invoice,
        setProposalAmount(proposal: ProposalAmountInput): Proposal,
        submitPayment(payment: PaymentInput!): Payment!
    }

    
    input PaymentInput {
        recipient: String!
        invoiceid: String!
        proposalid: String
        currency: String!
        total: Float!
        status: String!
        transactionHash: String
        budgetid: String!
    }
    
    
    input BudgetInput {
        category: String
        amount: Float
        currency: String
        breakdown: Float
        proposalid: String
        rootpath: String
    }
    input InvoiceInput {
        category: String
        recipient: String
        owneraddress: String
        proposal: String
        number: String
        budgetid: String
        total: Float
        currency: String
        date: String
        duedate: String
        description: String
        uploadinvoice: String
        rootpath: String
    }
    input ProposalAmountInput {
        id: String
        amount: Float
        modifier: String
        rootpath: String
        daoid: String
    }
    input ProposalInput {
        id: String
        amount: Float
        modified: String
        status: String
        modifier: String
        rootpath: String
        daoid: String
    }
`;
const resolvers = {
  Query: {
    ...proposalResolver.Query,
    ...budgetResolver.Query,
    ...invoiceResolver.Query,
    ...paymentsResolver.Query,
  },
  Mutation: {
    ...proposalResolver.Mutation,
    ...budgetResolver.Mutation,
    ...invoiceResolver.Mutation,
    ...paymentsResolver.Mutation,
  },
  Budget: {
    async invoices(parent) {
      try {
        // Fetch invoices associated with the budget
        const invoices = await Invoice.findAll({
          where: { budgetid: parent.id },
        });

        return invoices;
      } catch (error) {
        console.log("error: ", error);
        throw new GraphQLError(error.message);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers: resolvers,
  introspection: true,
});

module.exports = server;
