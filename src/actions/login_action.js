import API from "./API";
import { actionPending, actionSuccess, actionError } from "./index";

export const LOGIN_PENDING = "LOGIN_PENDING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const REGIS_PENDING = "REGIS_PENDING";
export const REGIS_SUCCESS = "REGIS_SUCCESS";
export const REGIS_ERROR = "REGIS_ERROR";
export const LOGOUT = "LOGOUT";
export const SET_MSG = "SET_MSG";
export const RESET = "RESET";

const LOGIN_URL = "login";
const REGIS_URL = "register";

export function login(values) {
  const param = {
    email: values.email,
    password: values.password
  }
  return async (dispatch) => {
    dispatch(actionPending(LOGIN_PENDING));
    try {
      const response = await API.post(`${LOGIN_URL}`, param);
      dispatch(actionSuccess(LOGIN_SUCCESS, response.data));
      localStorage.setItem("katahack_user", JSON.stringify(response.data));
      return response;
    } catch (error) {
      dispatch(actionError(LOGIN_ERROR, error));
      throw error;
    }
  };
}

export function register(values) {
  const param = {
    email: values.email,
    password: values.password,
    password_confirmation: values.password_confirmation,
    name: values.name,
  }
  return async (dispatch) => {
    dispatch(actionPending(REGIS_PENDING));
    try {
      const response = await API.post(`${REGIS_URL}`, param);
      dispatch(actionSuccess(REGIS_SUCCESS, response.data));
      return response;
    } catch (error) {
      let errMsg = '';
      if (error?.response?.data) {
        if (error?.response?.data?.name) {
          errMsg = error?.response?.data?.name[0]
        } else if (error?.response?.data?.email) {
          errMsg = error?.response?.data?.email[0]
        } else if (error?.response?.data?.password) {
          errMsg = error?.response?.data?.password[0]
        } else if (error?.response?.data?.password_confirmation) {
          errMsg = error?.response?.data?.password_confirmation[0]
        }
      }
      dispatch(actionError(REGIS_ERROR, errMsg));



    }
  };
}

export function setMsg(msg = '') { 
  return {
    type: SET_MSG,
    msg: msg,
  };
}


export function reset() {
  return {
    type: RESET,
  };
}


export function logout() { 
  return { type: LOGOUT };
}
