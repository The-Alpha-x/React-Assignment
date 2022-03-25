import * as types from "../constants";
import { ItemServices } from "../../services/ItemService";

export const ItemActions = {
    getAllItems,
  };

  function getAllItems() {
    return (dispatch) => {
      dispatch(request());
  
      return ItemServices.getAllItems().then(
        (items) => dispatch(success(items)),
        (error) => dispatch(failure(error))
      );
    };

    function request() {
        return { type: types.GET_ALL_ITEMS_REQUEST };
      }
      function success(items) {
        return { type: types.GET_ALL_ITEMS_SUCCESS, items };
      }
      function failure(error) {
        return { type: types.GET_ALL_ITEMS_FAILURE, error };
      }
    }