import { combineReducers } from "redux";
import employeeReducer from "./employees";

export default combineReducers({
  employee: employeeReducer,
});
