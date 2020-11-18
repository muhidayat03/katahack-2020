import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGIS_PENDING,
  REGIS_SUCCESS,
  REGIS_ERROR,
  SET_MSG,
  RESET
} from "../actions/login_action";

const initialState = {
  pending: false,
  error: null,
};

export function login(state = { ...initialState, data: null }, action) {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        pending: true,
      };
    case LOGIN_SUCCESS: 
      return {
        ...state,
        pending: false,
        data: action.data,
        error: null,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case RESET:
      return {
        ...initialState,
        data: null
      };
    default:
      return state;
  }
}

export function register(state = { ...initialState, data: null }, action) { 
  switch (action.type) {
    case REGIS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case REGIS_SUCCESS: 
      return {
        ...state,
        pending: false,
        data: action.data,
        error: null,
      };
    case REGIS_ERROR: 
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case RESET: 
      return {
        ...initialState,
        data: null
      };
    default:
      return state;
  }
}

export function setMsg(msg = '', action) {
  switch (action.type) {
    case SET_MSG:
      console.log('udah kesinii')
      return action.msg;
    default:
      return msg;
  }
}


