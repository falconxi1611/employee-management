import { API_PATH } from '../utils/constants';
import AxiosInstance from './axios';
export default class EmployeeServices {
  /**
   * Get list of employees
   *
   * @returns List all employees
   */
  getEmployees = () =>
    AxiosInstance.get(API_PATH.EMPLOYEES)
      .then(res => res)
      .catch(err => err.response || err);

  /**
   * Get employee Detail
   *
   * @employeeId string
   *
   */
  getEmployeeDetail = employeeId =>
    AxiosInstance.get(`${API_PATH.EMPLOYEES}/${employeeId}`)
      .then(res => res)
      .catch(err => err.response || err);

  /**
   * Add new employee
   *
   * @param {object} body Employee object
   */
  addEmployees = body =>
    AxiosInstance.post(API_PATH.EMPLOYEES, body)
      .then(res => res)
      .catch(err => err.response || err);

  /*
   * Update employee
   *
   * @param {object} body Employee object
   *
   */
  updateEmployees = (idUpdate, params) => {
    AxiosInstance.put(`${API_PATH.EMPLOYEES}/${idUpdate}`, params)
      .then(res => res)
      .catch(err => err.response || err);
  };

  /*
   * Delete employee
   *
   * @params = { idDelete }
   *
   */
  deleteEmployees = idDelete =>
    AxiosInstance.delete(`${API_PATH.EMPLOYEES}/${idDelete}`)
      .then(res => res)
      .catch(err => err.response || err);
}
