/**
 *
 * RadioButton
 *
 */

import React, { memo } from 'react';
import { Form, Radio } from 'antd';
import PropTypes from 'prop-types';
import './style.scss';

function RadioButton(props) {
  const { name, label, arrValue } = props;
  return (
    <Form.Item className="form-label" name={name} label={label}>
      <Radio.Group>
        {arrValue.map(record => (
          <Radio value={record.key}>{record.value}</Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
}

RadioButton.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  arrValue: PropTypes.array,
};

export default memo(RadioButton);
