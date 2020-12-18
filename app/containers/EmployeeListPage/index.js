/**
 *
 * EmployeeListPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Table, Space, Typography, Button, Modal } from 'antd';
import {
  EditTwoTone,
  DeleteTwoTone,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { EMPLOYEE_FIELD } from 'utils/constants';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectEmployeeListPage, {
  makeSelectEmployeeList,
  makeSelectIsLoading,
} from './selectors';
import { getEmployeeListAction, deleteEmployeeAction } from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

const { Title } = Typography;

const styleAction = { fontSize: 16 };
export function EmployeeListPage(props) {
  const { isLoading, getEmployeeList, employeeList, deleteEmployee } = props;
  useInjectReducer({ key: 'employeeListPage', reducer });
  useInjectSaga({ key: 'employeeListPage', saga });

  useEffect(() => {
    getEmployeeList();
  }, []);

  const handleClickDelete = idDelete => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      content: 'Are you sure you want to delete this employee ?',
      okText: 'Ok',
      cancelText: 'Cancel',
      onOk: () => {
        deleteEmployee(idDelete);
      },
    });
  };

  const columns = [
    {
      title: 'First name',
      dataIndex: EMPLOYEE_FIELD.FIRST_NAME,
      className: 'tets',
    },
    {
      title: 'Last name',
      dataIndex: EMPLOYEE_FIELD.LAST_NAME,
    },
    {
      title: 'Email address',
      dataIndex: EMPLOYEE_FIELD.EMAIL_ADDRESS,
    },
    {
      title: 'Phone number',
      dataIndex: EMPLOYEE_FIELD.PHONE_NUMBER,
    },
    {
      title: 'Gender',
      dataIndex: EMPLOYEE_FIELD.GENDER,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/employee/edit/${record.id}`}>
            <EditTwoTone style={styleAction} />
          </Link>
          <DeleteTwoTone
            style={styleAction}
            onClick={() => handleClickDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="list-employee">
      <Title className="employee-list-title">Employee List</Title>
      <div className="add-btn">
        <Link to="/employee/add">
          <Button type="primary">Add</Button>
        </Link>
      </div>
      <Table loading={isLoading} columns={columns} dataSource={employeeList} />
    </div>
  );
}

EmployeeListPage.propTypes = {
  isLoading: PropTypes.bool,
  employeeList: PropTypes.array,
  getEmployeeList: PropTypes.func,
  deleteEmployee: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  employeeListPage: makeSelectEmployeeListPage(),
  isLoading: makeSelectIsLoading(),
  employeeList: makeSelectEmployeeList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getEmployeeList: () => dispatch(getEmployeeListAction()),
    deleteEmployee: idDelete => dispatch(deleteEmployeeAction(idDelete)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EmployeeListPage);
