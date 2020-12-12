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
const makeSelectIsLoading = () =>
  createSelector(
    selectEmployeeFormPageDomain,
    substate => substate.isLoading,
  );

const makeSelectEmployeeDetail = () =>
  createSelector(
    selectEmployeeFormPageDomain,
    substate => substate.employeeDetail,
  );

/**
 * Default selector used by EmployeeFormPage
 */

const makeSelectEmployeeFormPage = () =>
  createSelector(
    selectEmployeeFormPageDomain,
    substate => substate,
  );

export default makeSelectEmployeeFormPage;
export {
  selectEmployeeFormPageDomain,
  makeSelectIsLoading,
  makeSelectEmployeeDetail,
};
