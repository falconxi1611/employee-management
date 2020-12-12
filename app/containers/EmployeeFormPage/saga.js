import { all, call, put, takeLatest } from 'redux-saga/effects';
import EmployeeServices from '../../services/employee';
import {
  GET_DETAIL_ACTION,
  ADD_EMPLOYEE_ACTION,
  EDIT_EMPLOYEE_ACTION,
} from './constants';
import { setLoadingAction, setDetailAction } from './actions';

function* getDetailSaga({ idEmployee }) {
  const employeeServices = new EmployeeServices();
  yield put(setLoadingAction(true));
  try {
    const res = yield call(employeeServices.getEmployeeDetail, idEmployee);
    if (res.status === 200) {
      yield put(setLoadingAction(false));
      yield put(setDetailAction(res.data.employee));
    }
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setLoadingAction(false));
  }
}

function* addEmployeeSaga({ employee }) {
  const employeeServices = new EmployeeServices();
  yield put(setLoadingAction(true));
  try {
    const res = yield call(employeeServices.addEmployees, employee);
    if (res.status === 200) {
      yield put(setLoadingAction(false));
    }
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setLoadingAction(false));
  }
}

function* editEmployeeSaga({ idEmployee, employee }) {
  const employeeServices = new EmployeeServices();
  yield put(setLoadingAction(true));
  try {
    const res = yield call(
      employeeServices.updateEmployees,
      idEmployee,
      employee,
    );
    if (res.status === 200) {
      yield put(setLoadingAction(false));
    }
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setLoadingAction(false));
  }
}

// Individual exports for testing
export default function* employeeFormPageSaga() {
  yield all([
    takeLatest(GET_DETAIL_ACTION, getDetailSaga),
    takeLatest(ADD_EMPLOYEE_ACTION, addEmployeeSaga),
    takeLatest(EDIT_EMPLOYEE_ACTION, editEmployeeSaga),
  ]);
}
