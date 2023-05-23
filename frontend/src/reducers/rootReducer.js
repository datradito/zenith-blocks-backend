import { combineReducers } from 'redux';
import currentProposalReducer from './currentProposal/index';
import createBudgetReducer from './createBudgetReducers/index';


const rootReducer = combineReducers({
    currentProposal: currentProposalReducer,
    createBudget: createBudgetReducer,
});

export default rootReducer;
