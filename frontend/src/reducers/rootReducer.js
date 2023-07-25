import { combineReducers } from 'redux';
import currentProposalReducer from './currentProposal/index';
import createBudgetReducer from './createBudgetReducers/index';
import createInvoiceReducer from './createInvoiceReducer/index';
import currentBudgetReducer from './currentBudget/index';
import proposalAmountReducer from './currentProposal/proposalAmount';


const rootReducer = combineReducers({
    currentProposal: currentProposalReducer,
    createBudget: createBudgetReducer,
    createInvoice: createInvoiceReducer,
    currentBudget: currentBudgetReducer,
    currentProposalAmounts: proposalAmountReducer,
});

export default rootReducer;
