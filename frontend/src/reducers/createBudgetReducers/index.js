import {
  UPDATE_FIELD,
  GET_ALL_ROWS,
  SET_INITIAL_STATE,
  REFRESH_STATE,
} from "../../actions/createBudgetAction/types";

// const storedState = JSON.parse(localStorage.getItem('persist:root'));

const initialState = {
  items: [
    {
      // action: '-',
      category: "",
      amount: "",
      currency: "",
      breakdown: "",
      remaining: "",
    },
  ],
  proposal: {},
};

const createBudgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_STATE: {
      return {
        ...state,
        items: [
          {
            ...state.items[0],
            id: action.payload.id, // Add the id field to the first item
          },
        ],
        proposal: {
          goverance: action.payload.proposal.space,
          totalBudget: action.payload.budget,
          proposalId: action.payload.proposal.id,
          ipfs: action.payload.proposal.ipfs,
        },
      };
    }
    case UPDATE_FIELD:
          const { index, field, value } = action.payload;
      return {
        ...state,
        items: state.items.map((item, idx) =>
          idx === index
            ? {
                ...item,
                [field]: value,
                breakdown: `${
                  (parseInt(item.amount) /
                    parseInt(state.proposal.totalBudget)) *
                  100
                }`,
              }
            : item
        ),
      };
    case REFRESH_STATE:
      return {
        items: [
          {
            category: "",
            amount: "",
            currency: "",
            breakdown: "",
            remaining: "",
          },
        ],
        proposal: {},
      };
    case GET_ALL_ROWS:
      return state;
    default:
      return state;
  }
};

export default createBudgetReducer;
