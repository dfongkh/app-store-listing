import { ActionTypes } from "../constants/action-types";

export const allListingsReducer = (
  state = { allListings: [] },
  action: any
) => {
  switch (action.type) {
    case ActionTypes.FETCH_ALL_LISTINGS:
      return {
        ...state,
        allListings: action.payload,
      };
    default:
      return state;
  }
};

export const recommendListReducer = (state = [], action: any) => {};
