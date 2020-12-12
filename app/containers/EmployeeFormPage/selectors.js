import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the employeeFormPage state domain
 */

const selectEmployeeFormPageDomain = state =>
  state.employeeFormPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EmployeeFormPage
 */

const makeSelectEmployeeFormPage = () =>
  createSelector(
    selectEmployeeFormPageDomain,
    substate => substate,
  );

export default makeSelectEmployeeFormPage;
export { selectEmployeeFormPageDomain };
