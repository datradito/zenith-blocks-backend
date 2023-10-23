const { ApolloServer } = require("@apollo/server");
const proposalResolver = require("../graphQL/proposals/proposalResolver");
const invoiceResolver = require("../graphQL/invoices/invoiceResolver");
const budgetResolver = require("../graphQL/budgets/budgetResolver");
const paymentsResolver = require("../graphQL/payments/paymentsResolver");
const walletResolvers = require("../graphQL/dashboard/walletResolvers");
const transactionHistoryResolver = require("../graphQL/dashboard/transactionHistoryResolver");
const Invoice = require("../Database/models/Invoice");


const typeDefs = `#graphql

    type Amount {
        amount: Float
        name: String
    }

    type DuplicateInvoice{
        id: String!
    }
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

    type Token {
      name: String
      symbol: String
      balance: Float
      logo: String
  }

  type Transaction {
    blockNum: String
    uniqueId: String
    hash: String
    from: String
    to: String
    value: Float
    tokenId: String
    asset: String
    category: String
  }


    type Query {
        getBudgetById(id: String): Budget,
        getBudgetsForProposal(proposalid: String): [Budget],
        getInvoiceById(id: String): Invoice,
        getInvoicesByBudget(budgetid: String): [Invoice],
        getProposalDetailsById(id: String): Proposal,
        getRemainingProposalAmount(id: String!): Amount!,
        getProposalsByDao(daoid: String): [Proposal],
        getPaymentByInvoiceId(invoiceid: String!): Payment
        getAllPayments: [Payment!]!
        getRemainingBudgetAmount(budgetid: String!): Amount!
        getTokenBalances(address: String!): [Token]
        getTokenTransactionHistory(address: String!): [Transaction]
    }
    type Mutation {
        submitBudget(budget: BudgetInput): Budget,
        submitInvoice(invoice: InvoiceInput): Invoice,
        setProposalAmount(proposal: ProposalAmountInput): Proposal,
        submitPayment(payment: PaymentInput!): Payment!
        duplicateInvoice(id: String!): Invoice
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
    ...walletResolvers.Query,
    ...transactionHistoryResolver.Query,
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
