/**
 *
 * EmployeeListPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Table, Space, Typography, Button } from 'antd';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { EMPLOYEE_FIELD } from 'utils/constants';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectEmployeeListPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

const { Title } = Typography;

const styleAction = { fontSize: 16 };

const columns = [
  {
    title: 'First name',
    dataIndex: EMPLOYEE_FIELD.FIRST_NAME,
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
    render: (text, record) => (
      <Space size="middle">
        <a>
          <EditTwoTone style={styleAction} />
        </a>
        <a>
          <DeleteTwoTone style={styleAction} />
        </a>
      </Space>
    ),
  },
];

const data = [
  {
    [EMPLOYEE_FIELD.FIRST_NAME]: 'John Brown',
    [EMPLOYEE_FIELD.LAST_NAME]: 'Peter',
    [EMPLOYEE_FIELD.EMAIL_ADDRESS]: 'peter@gmail.com',
    [EMPLOYEE_FIELD.PHONE_NUMBER]: '+84123231232',
    [EMPLOYEE_FIELD.GENDER]: 'Male',
  },
];
export function EmployeeListPage() {
  useInjectReducer({ key: 'employeeListPage', reducer });
  useInjectSaga({ key: 'employeeListPage', saga });

  return (
    <div className="list-employee">
      <Title className="employee-list-title">Employee List</Title>
      <div className="add-btn">
        <Link to="/employee/add">
          <Button type="primary">Add</Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

EmployeeListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  employeeListPage: makeSelectEmployeeListPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
