import { combineReducers } from 'redux';
import currentProposalReducer from './currentProposal/index';
import createBudgetReducer from './createBudgetReducers/index';
import createInvoiceReducer from './createInvoiceReducer/index';
import currentBudgetReducer  from './currentBudget/index';


const rootReducer = combineReducers({
    currentProposal: currentProposalReducer,
    createBudget: createBudgetReducer,
    createInvoice: createInvoiceReducer,
    currentBudget: currentBudgetReducer,
});

export default rootReducer;
