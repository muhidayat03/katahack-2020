import API from "./API";
import { actionPending, actionSuccess, actionError } from "./index";

export const LIST_PRODUCT_PENDING = "LIST_PRODUCT_PENDING";
export const LIST_PRODUCT_SUCCESS = "LIST_PRODUCT_SUCCESS";
export const LIST_PRODUCT_ERROR = "LIST_PRODUCT_ERROR";
export const ADD_PRODUCT_PENDING = "ADD_PRODUCT_PENDING";
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
export const ADD_PRODUCT_ERROR   = "ADD_PRODUCT_ERROR";


const LIST_PRODUCT_URL = "produk";
const ADD_PRODUCT_URL = "produk";

export function listProduct(page) {
  console.log('asdfasdfasdfsdf')
  return async (dispatch) => {
    dispatch(actionPending(LIST_PRODUCT_PENDING));
    try {
      const response = await API.get(`${LIST_PRODUCT_URL}?page=${page}`);
      dispatch(actionSuccess(LIST_PRODUCT_SUCCESS, response.data));
      return response;
    } catch (error) {
      dispatch(actionError(LIST_PRODUCT_ERROR, error));
      throw error;
    }
  };
}
export function addProduct(param) {

  return async (dispatch) => {
    dispatch(actionPending(ADD_PRODUCT_PENDING));
    try {
      const response = await API.post(`${ADD_PRODUCT_URL}`, param);
      dispatch(actionSuccess(ADD_PRODUCT_SUCCESS, response.data)); 
      return response;
    } catch (error) {
      dispatch(actionError(ADD_PRODUCT_ERROR, error));
      throw error;
    }
  };
}