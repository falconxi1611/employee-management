/*
 *
 * EmployeeFormPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  SET_LOADING_ACTION,
  SET_DETAIL_ACTION,
  SET_ERROR_ACTION,
} from './constants';

export const initialState = {
  isLoading: false,
  employeeDetail: {},
  errMessage: '',
};

/* eslint-disable default-case, no-param-reassign */
const employeeFormPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SET_LOADING_ACTION:
        draft.isLoading = action.flag ? action.flag : false;
        break;
      case SET_DETAIL_ACTION:
        draft.employeeDetail = action.employeeDetail || {};
        break;
      case SET_ERROR_ACTION:
        draft.errMessage = action.errMessage || '';
        break;
    }
  });

export default employeeFormPageReducer;
