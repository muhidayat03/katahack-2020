import {
  LIST_CATEGORY_PENDING,
  LIST_CATEGORY_SUCCESS,
  LIST_CATEGORY_ERROR,
  ADD_CATEGORY_PENDING,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_ERROR,
} from "../actions/category_action";

const initialState = {
  pending: false,
  error: null,
};

export function listCategory(state = { ...initialState, data: null }, action) {
  switch (action.type) {
    case LIST_CATEGORY_PENDING:
      return {
        ...state,
        pending: true,
      };
    case LIST_CATEGORY_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
        error: null,
      };
    case LIST_CATEGORY_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}
export function addCategory(state = { ...initialState, data: null }, action) {
  switch (action.type) {
    case ADD_CATEGORY_PENDING:
      return {
        ...state,
        pending: true,
      };
    case ADD_CATEGORY_SUCCESS:
      console.log("masuk sini", action.data);
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case ADD_CATEGORY_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}





