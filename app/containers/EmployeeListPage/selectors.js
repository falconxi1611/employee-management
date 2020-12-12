import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the employeeListPage state domain
 */

const selectEmployeeListPageDomain = state =>
  state.employeeListPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EmployeeListPage
 */

const makeSelectEmployeeListPage = () =>
  createSelector(
    selectEmployeeListPageDomain,
    substate => substate,
  );

const makeSelectIsLoading = () =>
  createSelector(
    selectEmployeeListPageDomain,
    substate => substate.isLoading,
  );

const makeSelectEmployeeList = () =>
  createSelector(
    selectEmployeeListPageDomain,
    substate => substate.employeeList,
  );
export default makeSelectEmployeeListPage;
export {
  selectEmployeeListPageDomain,
  makeSelectIsLoading,
  makeSelectEmployeeList,
};
