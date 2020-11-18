import API from "./API";
import { actionPending, actionSuccess, actionError } from "./index";

export const LIST_PARTNER_PENDING = "LIST_PARTNER_PENDING";
export const LIST_PARTNER_SUCCESS = "LIST_PARTNER_SUCCESS";
export const LIST_PARTNER_ERROR = "LIST_PARTNER_ERROR";
export const ADD_PARTNER_PENDING = "ADD_PARTNER_PENDING";
export const ADD_PARTNER_SUCCESS = "ADD_PARTNER_SUCCESS";
export const ADD_PARTNER_ERROR   = "ADD_PARTNER_ERROR";


const LIST_PARTNER_URL = "partner";
const ADD_PARTNER_URL = "partner";

export function listPartner(page) {
  console.log('asdfasdfasdfsdf')
  return async (dispatch) => {
    dispatch(actionPending(LIST_PARTNER_PENDING));
    try {
      const response = await API.get(`${LIST_PARTNER_URL}?page=${page}`);
      dispatch(actionSuccess(LIST_PARTNER_SUCCESS, response.data));
      return response;
    } catch (error) {
      dispatch(actionError(LIST_PARTNER_ERROR, error));
      throw error;
    }
  };
}
export function addPartner(param) {

  return async (dispatch) => {
    dispatch(actionPending(ADD_PARTNER_PENDING));
    try {
      const response = await API.post(`${ADD_PARTNER_URL}`, param);
      dispatch(actionSuccess(ADD_PARTNER_SUCCESS, response.data)); 
      return response;
    } catch (error) {
      dispatch(actionError(ADD_PARTNER_ERROR, error));
      throw error;
    }
  };
}