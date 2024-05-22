import proposalResolver from "../graphQL/proposals/proposalResolver.js";
import invoiceResolver from "../graphQL/invoices/invoiceResolver.js";
import budgetResolver from "../graphQL/budgets/budgetResolver.js";
import paymentsResolver from "../graphQL/payments/paymentsResolver.js";
import categoryResolver from "../graphQL/categories/index.js";
import userResolver from "../graphQL/user/userResolver.js";
import Proposal from "../Database/models/Proposal.js";
import { GraphQLError } from "graphql";
import budgetLoader from "../services/budgets/BudgetLoader.js";
import billLoader from "../services/bills/BillsLoader.js";
import { callExternalGraphQLAPI } from "../services/snapshot/callApi.js";
import { proposalByIdQuery } from "../services/snapshot/query.js";

export const typeDefs = `#graphql
   type DeleteBillsResponse {
      deletedBillIds: [String]
    }
    type Contacts {
        id: String
        name: String
        address: String
        daoid: String
        safeaddress: String
    }
    type DuplicateInvoice{
        id: String!
    }
    """Budget type with bills, each bill must link to Proposal"""
    type Budget {
        id: ID
        category: String
        amount: Float
        currency: String
        breakdown: Float
        proposalid: String
        proposal: Proposal
        remaining: Float
        createdAt: String
        description: String
        """bills are returned from dataloader, meaning after first request result will be cached, if we see issues with stale data, move billLoader to context on each request"""
        invoices: [Invoice]
    }

    type Category {
      id: ID!
      label: String
    }

    type Wallet {
      balance: Float
      currency: String
    }

    type TransactionHistory {
      items: [Transaction]
      count: Int
    }

    type BudgetList {
      items: [Budget]
      count: Int
    }

    """Merged proposal from zenith and snapshot data"""
    type Proposal {
        id: ID
        amount: Float
        currency: String
        status: String
        daoid: String
        body: String
        title: String
        createdAt: String
        """Budgets are handled through dataloader, if issue with stale data are encountered, look into setting up budget loader in context so that we dont return data from cache"""
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
        description: String
        budgetid: String
        status: String
        transactionHash: String
        chainId: String
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

  type User {
    id: String
    daoid: String
    address: String
    notificationSettings: NotificationSettings
    discordid: String
    telegramid: String
  }

  type NotificationSettings {
    discord: Boolean
    telegram: Boolean
  }


    type Query {
        categories: [Category]
        getBudgetById(id: String): Budget,
        getBudgets(first: Int, skip: Int, filters: BudgetFilterInput) : BudgetList,
        getBudgetsForProposal(proposalid: String): [Budget],
        getInvoiceById(id: String): Invoice,
        getInvoices(filter: InvoiceFilterInput): [Invoice],
        getProposalDetailsById(id: String): Proposal,
        getRemainingProposalAmount(id: String!): Float!,
        getProposalsByDao(daoid: String, first: Int, skip: Int, title: String): [Proposal],
        getPaymentByInvoiceId(invoiceid: String!): Payment
        getAllPayments: [Payment!]!
        getTokenBalances(address: String!): [Token]
        getTokenTransactionHistory(address: String!): [Transaction]
        currentUser: User
    }
    type Mutation {
        createCategory(label: String!): Category
        submitBudget(budget: BudgetInput): Budget,
        submitInvoice(invoice: InvoiceInput): Invoice,
        setProposalAmount(proposal: ProposalAmountInput): Proposal,
        submitPayment(payment: PaymentInput!): Payment!
        duplicateInvoice(id: String!): Invoice
        deleteBills(billIds: [String]!): DeleteBillsResponse
        updateBillStatus(billId: String!, status: String!): Invoice
        createUser(input: UserInput!): User
        updateNotificationSetting(id: String!, value: String!): User
        updateNotificationStatus(id: String!, status: Boolean!): User
    }

    input UserInput {
      daoid: String!
      address: String!
      discordid: String
      telegramid: String
      notificationSettings: NotificationSettingsInput
    }

    input NotificationSettingsInput {
      discord: Boolean
      telegram: Boolean
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
        category: String!
        amount: Float!
        currency: String!
        proposalid: String!
        description: String
    }

    input InvoiceInput {
        category: String
        recipient: String
        owneraddress: String
        budgetid: String
        number: String
        total: Float
        currency: String
        date: String
        duedate: String
        description: String
        safeaddress: String
        daoid: String
        transactionHash: String
        chainId: String
    }
    input ProposalAmountInput {
        id: String
        amount: Float
        modifier: String
        daoid: String
        currency: String
        status: String
    }
    input ProposalInput {
        id: String
        amount: Float
        status: String
        modifier: String
        currency: String
        daoid: String
    }

    input InvoiceFilterInput {
      budgetid: String
      status: String
      safeaddress: String
    }

    input BudgetFilterInput {
      proposal_id: String
      safeaddress: String
      creation_date__gte: String
      creation_date__lte: String
      amount: Int
    }

`;

export const resolvers = {
  Query: {
    ...proposalResolver.Query,
    ...categoryResolver.Query,
    ...budgetResolver.Query,
    ...invoiceResolver.Query,
    ...paymentsResolver.Query,
    ...userResolver.Query,
  },
  Mutation: {
    ...proposalResolver.Mutation,
    ...budgetResolver.Mutation,
    ...invoiceResolver.Mutation,
    ...paymentsResolver.Mutation,
    ...categoryResolver.Mutation,
    ...userResolver.Mutation,
  },
  Budget: {
    async invoices(parent) {
      try {
        return await billLoader.load(parent.id);
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    async proposal(parent) {
      try {
        const proposal = await Proposal.findOne({
          where: { id: parent.proposalid },
        });

        const variables = {
          id: proposal.id,
        };

        const {
          data: { proposal: snapshotProposal },
        } = await callExternalGraphQLAPI(
          "https://hub.snapshot.org/graphql",
          proposalByIdQuery,
          variables
        );

        return {
          ...proposal.toJSON(),
          title: snapshotProposal.title,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Proposal: {
    async budgets(parent) {
      try {
        return await budgetLoader.load(parent.id);
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
