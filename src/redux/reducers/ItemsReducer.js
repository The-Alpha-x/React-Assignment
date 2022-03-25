import * as types from "../constants";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case types.GET_ALL_ITEMS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_ALL_ITEMS_SUCCESS:
      return action.items;

    case types.GET_ALL_ITEMS_FAILURE:
      return {
        error: action.error,
      };

    default:
      return state;
  }
}
