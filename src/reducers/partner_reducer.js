import {
  LIST_PARTNER_PENDING,
  LIST_PARTNER_SUCCESS,
  LIST_PARTNER_ERROR,
  ADD_PARTNER_PENDING,
  ADD_PARTNER_SUCCESS,
  ADD_PARTNER_ERROR,
} from "../actions/partner_action";

const initialState = {
  pending: false,
  error: null,
};

export function listPartner(state = { ...initialState, data: null }, action) {
  switch (action.type) {
    case LIST_PARTNER_PENDING:
      return {
        ...state,
        pending: true,
      };
    case LIST_PARTNER_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
        error: null,
      };
    case LIST_PARTNER_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}
export function addPartner(state = { ...initialState, data: null }, action) {
  switch (action.type) {
    case ADD_PARTNER_PENDING:
      return {
        ...state,
        pending: true,
      };
    case ADD_PARTNER_SUCCESS:
      console.log("masuk sini", action.data);
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case ADD_PARTNER_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}





