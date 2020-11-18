import API from "./API";
import { actionPending, actionSuccess, actionError } from "./index";

export const LIST_INVOICE_PENDING = "LIST_INVOICE_PENDING";
export const LIST_INVOICE_SUCCESS = "LIST_INVOICE_SUCCESS";
export const LIST_INVOICE_ERROR = "LIST_INVOICE_ERROR";
export const ADD_INVOICE_PENDING = "ADD_INVOICE_PENDING";
export const ADD_INVOICE_SUCCESS = "ADD_INVOICE_SUCCESS";
export const ADD_INVOICE_ERROR = "ADD_INVOICE_ERROR";


const LIST_INVOICE_URL = "invoice";
const ADD_INVOICE_URL = "invoice";

export function listInvoice(page) {
  console.log('asdfasdfasdfsdf')
  return async (dispatch) => {
    dispatch(actionPending(LIST_INVOICE_PENDING));
    try {
      const response = await API.get(`${LIST_INVOICE_URL}?page=${page}`);
      dispatch(actionSuccess(LIST_INVOICE_SUCCESS, response.data));
      return response;
    } catch (error) {
      dispatch(actionError(LIST_INVOICE_ERROR, error));
      throw error;
    }
  };
}
export function addInvoice(param, data) {

  return async (dispatch) => {
    dispatch(actionPending(ADD_INVOICE_PENDING));
    try {
      const response = await API.post(`${ADD_INVOICE_URL}`, data, { params: param });
      dispatch(actionSuccess(ADD_INVOICE_SUCCESS, response.data));
      return response;
    } catch (error) {
      dispatch(actionError(ADD_INVOICE_ERROR, error));
      throw error;
    }
  };
}