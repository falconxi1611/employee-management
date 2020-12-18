/*
 *
 * EmployeeFormPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_DETAIL_ACTION,
  SET_DETAIL_ACTION,
  ADD_EMPLOYEE_ACTION,
  EDIT_EMPLOYEE_ACTION,
  SET_LOADING_ACTION,
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

export function getDetailAction(idEmployee) {
  return {
    type: GET_DETAIL_ACTION,
    idEmployee,
  };
}

export function setDetailAction(employeeDetail) {
  return {
    type: SET_DETAIL_ACTION,
    employeeDetail,
  };
}

export function addEmployeeAction(employee, history) {
  return {
    type: ADD_EMPLOYEE_ACTION,
    employee,
    history,
  };
}

export function editEmployeeAction(idEmployee, employee, history) {
  return {
    type: EDIT_EMPLOYEE_ACTION,
    idEmployee,
    employee,
    history,
  };
}
