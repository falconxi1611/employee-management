import { all, call, put, takeLatest } from 'redux-saga/effects';
import { notification } from 'antd';
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
      yield put(setDetailAction(res.data.employee));
    }
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setLoadingAction(false));
  }
  return true;
}

function* addEmployeeSaga({ employee, history }) {
  const employeeServices = new EmployeeServices();
  yield put(setLoadingAction(true));
  try {
    const res = yield call(employeeServices.addEmployees, employee);
    if (res.status === 201) {
      notification.success({
        message: 'Add employee success !',
      });
      history.push('/employee/list');
    }
  } catch (err) {
    notification.error({
      message: 'Can not insert employee !',
    });
  } finally {
    yield put(setLoadingAction(false));
  }
}

function* editEmployeeSaga({ idEmployee, employee, history }) {
  const employeeServices = new EmployeeServices();
  yield put(setLoadingAction(true));
  try {
    const res = yield call(
      employeeServices.updateEmployees,
      idEmployee,
      employee,
    );
    if (res.status === 200) {
      notification.success({
        message: 'Update employee success !',
      });
      history.push('/employee/list');
    }
  } catch (err) {
    notification.error({
      message: 'Can not update employee !',
    });
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
