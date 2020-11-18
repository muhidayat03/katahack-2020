import { combineReducers } from "redux";


import { login, setMsg, register } from "./login_reducer";
import { listCategory, addCategory } from "./category_reducer";
import { listPartner, addPartner } from "./partner_reducer";
import { listProduct, addProduct } from "./product_reducer";
import { listInvoice, addInvoice } from "./invoice_reducer";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  form: formReducer,
  login,
  setMsg,
  register,
  listCategory,
  addCategory,
  listPartner,
  addPartner,
  listProduct,
  addProduct,
  listInvoice,
  addInvoice
});

export default rootReducer;
