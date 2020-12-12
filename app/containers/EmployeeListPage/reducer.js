/*
 *
 * EmployeeListPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  SET_LOADING_ACTION,
  SET_EMPLOYEE_LIST_ACTION,
} from './constants';

export const initialState = {
  employeeList: [],
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const employeeListPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SET_LOADING_ACTION:
        draft.isLoading = action.flag ? action.flag : false;
        break;
      case SET_EMPLOYEE_LIST_ACTION:
        draft.employeeList = action.employees || {};
        break;
    }
  });

export default employeeListPageReducer;
