import { all, call, put, takeLatest } from 'redux-saga/effects';
import EmployeeServices from '../../services/employee';
import { DELETE_EMPLOYEE_ACTION, GET_EMPLOYEE_LIST_ACTION } from './constants';
import {
  getEmployeeListAction,
  setEmployeeListAction,
  setLoadingAction,
} from './actions';

function* getEmployeeListSaga() {
  const employeeServices = new EmployeeServices();
  yield put(setLoadingAction(true));
  try {
    const res = yield call(employeeServices.getEmployees);
    if (res.status === 200) {
      yield put(setEmployeeListAction(res.data));
    }
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setLoadingAction(false));
  }
}

function* deleteEmployeeSaga({ idDelete }) {
  try {
    const employeeServices = new EmployeeServices();
    yield put(setLoadingAction(true));
    const res = yield call(employeeServices.deleteEmployees, idDelete);
    if (res.status === 200) {
      yield put(getEmployeeListAction(res.data));
    }
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setLoadingAction(false));
  }
}

export default function* employeeListPageSaga() {
  yield all([
    takeLatest(GET_EMPLOYEE_LIST_ACTION, getEmployeeListSaga),
    takeLatest(DELETE_EMPLOYEE_ACTION, deleteEmployeeSaga),
  ]);
}
