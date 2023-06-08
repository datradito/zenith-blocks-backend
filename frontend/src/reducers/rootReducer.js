import { combineReducers } from 'redux';
import currentProposalReducer from './currentProposal/index';
import createBudgetReducer from './createBudgetReducers/index';
import createInvoiceReducer from './createInvoiceReducer/index';


const rootReducer = combineReducers({
    currentProposal: currentProposalReducer,
    createBudget: createBudgetReducer,
    createInvoice: createInvoiceReducer,
});

export default rootReducer;
