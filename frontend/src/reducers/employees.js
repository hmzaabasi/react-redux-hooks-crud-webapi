import {
  CREATE_EMPLOYEE,
  GET_EMPLOYEES,
  GET_ALL_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
} from "../actions/types";

const initialState = {};

function employeeReducer(employees = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_EMPLOYEE:
      return [...employees, payload];

    case GET_EMPLOYEES:
      return [payload?.data];

    case GET_ALL_EMPLOYEE:
      return payload;

    case UPDATE_EMPLOYEE:
      return employees.map((employee) => {
        if (employee.id === payload.id) {
          return {
            ...employee,
            ...payload,
          };
        } else {
          return employee;
        }
      });

    case DELETE_EMPLOYEE:
      return employees?.filter(({ id }) => id !== payload.id);

    default:
      return employees;
  }
}

export default employeeReducer;
