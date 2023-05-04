import { combineReducers } from 'redux';
import currentProposalReducer from './currentProposal/index';


const rootReducer = combineReducers({
    currentProposal: currentProposalReducer,
});

export default rootReducer;
