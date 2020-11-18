import {
  LIST_PRODUCT_PENDING,
  LIST_PRODUCT_SUCCESS,
  LIST_PRODUCT_ERROR,
  ADD_PRODUCT_PENDING,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
} from "../actions/product_action";

const initialState = {
  pending: false,
  error: null,
};

export function listProduct(state = { ...initialState, data: null }, action) {
  switch (action.type) {
    case LIST_PRODUCT_PENDING:
      return {
        ...state,
        pending: true,
      };
    case LIST_PRODUCT_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
        error: null,
      };
    case LIST_PRODUCT_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}
export function addProduct(state = { ...initialState, data: null }, action) {
  switch (action.type) {
    case ADD_PRODUCT_PENDING:
      return {
        ...state,
        pending: true,
      };
    case ADD_PRODUCT_SUCCESS:
      console.log("masuk sini", action.data);
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case ADD_PRODUCT_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}





