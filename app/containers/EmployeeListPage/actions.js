/*
 *
 * EmployeeListPage actions
 *
 */

import {
  DEFAULT_ACTION,
  SET_LOADING_ACTION,
  GET_EMPLOYEE_LIST_ACTION,
  SET_EMPLOYEE_LIST_ACTION,
  DELETE_EMPLOYEE_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setLoadingAction(flag) {
  return {
    type: SET_LOADING_ACTION,
    flag,
  };
}

export function getEmployeeListAction() {
  return {
    type: GET_EMPLOYEE_LIST_ACTION,
  };
}

export function setEmployeeListAction(employees) {
  return {
    type: SET_EMPLOYEE_LIST_ACTION,
    employees,
  };
}

export function deleteEmployeeAction(idDelete) {
  return {
    type: DELETE_EMPLOYEE_ACTION,
    idDelete,
  };
}
