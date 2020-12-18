import { all, call, put, takeLatest } from 'redux-saga/effects';
import { notification } from 'antd';
import EmployeeServices from '../../services/employee';
import { DELETE_EMPLOYEE_ACTION, GET_EMPLOYEE_LIST_ACTION } from './constants';
import {
  getEmployeeListAction,
  setEmployeeListAction,
  setLoadingAction,
} from './actions';
import { setDetailAction } from '../EmployeeFormPage/actions';

function* getEmployeeListSaga() {
  const employeeServices = new EmployeeServices();
  yield put(setLoadingAction(true));
  try {
    const res = yield call(employeeServices.getEmployees);
    if (res.status === 200) {
      yield put(setEmployeeListAction(res.data.employees));
      yield put(setDetailAction({}));
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
    yield put(getEmployeeListAction(res.data));
    if (res.status === 204) {
      notification.success({
        message: 'Delete employee success !',
      });
    }
  } catch (err) {
    notification.error({
      message: 'Can not delete employee !',
    });
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
