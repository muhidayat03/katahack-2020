import API from "./API";
import { actionPending, actionSuccess, actionError } from "./index";

export const LIST_CATEGORY_PENDING = "LIST_CATEGORY_PENDING";
export const LIST_CATEGORY_SUCCESS = "LIST_CATEGORY_SUCCESS";
export const LIST_CATEGORY_ERROR = "LIST_CATEGORY_ERROR";
export const ADD_CATEGORY_PENDING = "ADD_CATEGORY_PENDING";
export const ADD_CATEGORY_SUCCESS = "ADD_CATEGORY_SUCCESS";
export const ADD_CATEGORY_ERROR   = "ADD_CATEGORY_ERROR";


const LIST_CATEGORY_URL = "kategori";
const ADD_CATEGORY_URL = "kategori";

export function listCategory(page) {
  console.log('asdfasdfasdfsdf')
  return async (dispatch) => {
    dispatch(actionPending(LIST_CATEGORY_PENDING));
    try {
      const response = await API.get(`${LIST_CATEGORY_URL}?page=${page}`);
      dispatch(actionSuccess(LIST_CATEGORY_SUCCESS, response.data));
      return response;
    } catch (error) {
      dispatch(actionError(LIST_CATEGORY_ERROR, error));
      throw error;
    }
  };
}
export function addCategory(param) {

  return async (dispatch) => {
    dispatch(actionPending(ADD_CATEGORY_PENDING));
    try {
      const response = await API.post(`${ADD_CATEGORY_URL}`, param);
      dispatch(actionSuccess(ADD_CATEGORY_SUCCESS, response.data)); 
      return response;
    } catch (error) {
      dispatch(actionError(ADD_CATEGORY_ERROR, error));
      throw error;
    }
  };
}