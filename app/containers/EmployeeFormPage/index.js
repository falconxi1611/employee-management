/**
 *
 * EmployeeFormPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin, Form, Typography, Button, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Prompt } from 'react-router';
import { compose } from 'redux';
import { EMPLOYEE_FIELD } from 'utils/constants';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Textbox from '../../components/Textbox';
import RadioButton from '../../components/RadioButton';
import makeSelectEmployeeFormPage, {
  makeSelectIsLoading,
  makeSelectEmployeeDetail,
} from './selectors';
import {
  getDetailAction,
  addEmployeeAction,
  editEmployeeAction,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

const { Title } = Typography;
const ARRAY_GENDER = [
  {
    key: 'Male',
    value: 'Male',
  },
  {
    key: 'Female',
    value: 'Female',
  },
];
export function EmployeeFormPage(props) {
  const {
    history,
    isLoading,
    getDetailEmployee,
    addEmployee,
    editEmployee,
    employeeDetail,
    match,
  } = props;
  useInjectReducer({ key: 'employeeFormPage', reducer });
  useInjectSaga({ key: 'employeeFormPage', saga });
  const [form] = Form.useForm();
  const [idDetail, setIdDetail] = useState(null);
  const [isChangeForm, setChangeForm] = useState(false);

  useEffect(() => {
    const { id } = match.params;
    if (id) {
      getDetailEmployee(id);
      setIdDetail(id);
    }
  }, [match]);

  useEffect(() => {
    if (employeeDetail) {
      form.setFieldsValue(employeeDetail);
    }
  }, [employeeDetail]);

  const onFinish = async valuesForm => {
    if (idDetail) {
      await editEmployee(idDetail, valuesForm, history);
    } else {
      await addEmployee(valuesForm, history);
    }
    setChangeForm(false);
  };

  const ruleOfName = field => [
    {
      required: true,
      message: `Please input ${field}!`,
    },
    {
      min: 6,
      message: `${field} must be minimum 6 characters and max 10 characters`,
    },
    {
      max: 10,
      message: `${field} must be minimum 6 character and max 10 characters`,
    },
  ];

  const handleFieldChange = changedFields => {
    if (changedFields && idDetail) {
      setChangeForm(true);
    }
  };

  return (
    <React.Fragment>
      <Prompt
        when={isChangeForm}
        message="Form has been modified. You will loose your unsaved changes. Are you sure you want to close this form?"
      />
      <Spin spinning={isLoading}>
        <div className="employee-form">
          <Title className="employee-form-title">Employee Form</Title>
          <div className="bread-crumb">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/employee/list">Employee List</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Form employee</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Form
            form={form}
            name="employeeForm"
            onFinish={onFinish}
            scrollToFirstError
            layout="vertical"
            onFieldsChange={handleFieldChange}
          >
            <Textbox
              name={EMPLOYEE_FIELD.FIRST_NAME}
              label="First Name"
              rules={ruleOfName('First Name')}
            />
            <Textbox
              name={EMPLOYEE_FIELD.LAST_NAME}
              label="Last Name"
              rules={ruleOfName('Last Name')}
            />
            <Textbox
              name={EMPLOYEE_FIELD.EMAIL_ADDRESS}
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
            />
            <Textbox
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
            />
            <RadioButton
              name={EMPLOYEE_FIELD.GENDER}
              label="Gender"
              arrValue={ARRAY_GENDER}
            />
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
      </Spin>
    </React.Fragment>
  );
}

EmployeeFormPage.propTypes = {
  history: PropTypes.object,
  employeeDetail: PropTypes.object,
  isLoading: PropTypes.bool,
  addEmployee: PropTypes.func,
  editEmployee: PropTypes.func,
  getDetailEmployee: PropTypes.func,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  employeeFormPage: makeSelectEmployeeFormPage(),
  isLoading: makeSelectIsLoading(),
  employeeDetail: makeSelectEmployeeDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getDetailEmployee: idEmployee => dispatch(getDetailAction(idEmployee)),
    addEmployee: (employee, history) =>
      dispatch(addEmployeeAction(employee, history)),
    editEmployee: (idEmployee, employee, history) =>
      dispatch(editEmployeeAction(idEmployee, employee, history)),
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
