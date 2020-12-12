/**
 *
 * EmployeeFormPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Input, Typography, Button, Radio, Breadcrumb } from 'antd';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { EMPLOYEE_FIELD } from 'utils/constants';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectEmployeeFormPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

const { Title } = Typography;
export function EmployeeFormPage(props) {
  const { history } = props;
  useInjectReducer({ key: 'employeeFormPage', reducer });
  useInjectSaga({ key: 'employeeFormPage', saga });
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form: ', values);
    history.push('/employee/list');
  };

  const ruleOfName = field => [
    {
      required: true,
      message: `Please input ${field}!`,
    },
    {
      min: 6,
      message: `Please input ${field}! Minimum 6 character and max 10 characters`,
    },
    {
      max: 10,
      message: `Please input ${field}! Minimum 6 character and max 10 characters`,
    },
  ];

  return (
    <div className="employee-form">
      <Title className="employee-form-title">Employee Form</Title>
      <div className="bread-crumb">
        <Breadcrumb>
          <Breadcrumb.Item>Employee</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/employee/list">List</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Add new employee</a>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Form
        form={form}
        name="employeeForm"
        onFinish={onFinish}
        scrollToFirstError
        layout="vertical"
      >
        <Form.Item
          name={EMPLOYEE_FIELD.FIRST_NAME}
          label="First Name"
          rules={ruleOfName('First Name')}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={EMPLOYEE_FIELD.LAST_NAME}
          label="Last Name"
          rules={ruleOfName('Last Name')}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={EMPLOYEE_FIELD.PHONE_NUMBER}
          label="Phone"
          rules={[
            {
              message: "Please input Singapore's phone number!",
              pattern: new RegExp(
                /[6|8|9]\d{7}|\+65[6|8|9]\d{7}|\+65\s[6|8|9]\d{7}/g,
              ),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="radio-group" label="Gender">
          <Radio.Group>
            <Radio value="M">Male</Radio>
            <Radio value="F">Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button
          className="clear-btn"
          type="danger"
          onClick={() => {
            form.resetFields();
          }}
        >
          Clear
        </Button>
      </Form>
    </div>
  );
}

EmployeeFormPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  employeeFormPage: makeSelectEmployeeFormPage(),
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
)(EmployeeFormPage);
