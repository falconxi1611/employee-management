import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

function Textbox(props) {
  const { name, label, rules } = props;
  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Input />
    </Form.Item>
  );
}

Textbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.object,
};

export default memo(Textbox);
