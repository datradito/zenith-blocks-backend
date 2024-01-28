import { ApolloServer } from "@apollo/server";
import proposalResolver from "../graphQL/proposals/proposalResolver.js";
import invoiceResolver from "../graphQL/invoices/invoiceResolver.js";
import budgetResolver from "../graphQL/budgets/budgetResolver.js";
import paymentsResolver from "../graphQL/payments/paymentsResolver.js";
import walletResolvers from "../graphQL/dashboard/walletResolvers.js";
import transactionHistoryResolver from "../graphQL/dashboard/transactionHistoryResolver.js";
import Invoice from "../Database/models/Invoice.js";

export const typeDefs = `#graphql

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
        currency: String
        modified: String
        status: String
        modifier: String
        rootpath: String
        daoid: String
        budgets: [Budget]
    }

input InvoiceFilterInput {
  status: String
  # Other filter criteria if needed
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
        invoiceid: String!
        currency: String!
        total: Float!
        status: String!
        transactionhash: String
        budgetid: String!
        ipfs: String!
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
        getInvoicesByBudget(budgetid: String, where: InvoiceFilterInput): [Invoice],
        getProposalDetailsById(id: String): Proposal,
        getRemainingProposalAmount(id: String!): Float!,
        getProposalsByDao(daoid: String): [Proposal],
        getPaymentByInvoiceId(invoiceid: String!): Payment
        getAllPayments: [Payment!]!
        getRemainingBudgetAmount(budgetid: String!): Float!
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
        invoiceid: String!
        currency: String!
        total: Float!
        status: String!
        transactionhash: String
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
        currency: String
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
export const resolvers = {
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

// const server = new ApolloServer({
//   typeDefs,
//   resolvers: resolvers,
//   introspection: true,
// });


