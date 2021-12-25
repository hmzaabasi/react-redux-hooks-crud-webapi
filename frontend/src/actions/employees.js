import {
  CREATE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  GET_ALL_EMPLOYEE,
  GET_EMPLOYEES,
} from "./types";

import EmployeeService from "../services/employeeService";

export const getEmployeeById = (id) => async (dispatch) => {
  try {
    const res = await EmployeeService.get(id);
    dispatch({
      type: GET_EMPLOYEES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllEmployees = () => async (dispatch) => {
  try {
    const res = await EmployeeService.getAll();
    dispatch({
      type: GET_ALL_EMPLOYEE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const upsertEmployee =
  (employeeData, employeeId) => async (dispatch) => {
    try {
      const empId = employeeId;
      const res = !empId
        ? await EmployeeService.create(employeeData)
        : await EmployeeService.update(employeeData);

      dispatch({
        type: !empId ? CREATE_EMPLOYEE : UPDATE_EMPLOYEE,
        payload: !empId ? res.data : employeeData,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    await EmployeeService.remove(id);

    dispatch({
      type: DELETE_EMPLOYEE,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};
