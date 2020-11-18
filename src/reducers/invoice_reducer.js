import {
  LIST_INVOICE_PENDING,
  LIST_INVOICE_SUCCESS,
  LIST_INVOICE_ERROR,
  ADD_INVOICE_PENDING,
  ADD_INVOICE_SUCCESS,
  ADD_INVOICE_ERROR,
  DETAIL_INVOICE_PENDING,
  DETAIL_INVOICE_SUCCESS,
  DETAIL_INVOICE_ERROR,
} from "../actions/invoice_action";

const initialState = {
  pending: false,
  error: null,
};

export function listInvoice(state = { ...initialState, data: null }, action) {
  switch (action.type) {
    case LIST_INVOICE_PENDING:
      return {
        ...state,
        pending: true,
      };
    case LIST_INVOICE_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
        error: null,
      };
    case LIST_INVOICE_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export function addInvoice(state = { ...initialState, data: null }, action) {
  switch (action.type) {
    case ADD_INVOICE_PENDING:
      return {
        ...state,
        pending: true,
      };
    case ADD_INVOICE_SUCCESS:
      console.log("masuk sini", action.data);
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case ADD_INVOICE_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export function detailInvoice(state = { ...initialState, data: null }, action) {
  switch (action.type) {
    case DETAIL_INVOICE_PENDING:
      return {
        ...state,
        pending: true,
      };
    case DETAIL_INVOICE_SUCCESS: 
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case DETAIL_INVOICE_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}





