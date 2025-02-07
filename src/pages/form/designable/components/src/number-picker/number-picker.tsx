import { connect, mapProps, mapReadPretty } from '@formily/react';
import { InputNumber } from 'antd';
import { InputNumberProps } from 'antd/es/input-number';
import React from 'react';
import { PreviewText } from '../preview-text';

type NumberPickerProps = InputNumberProps;

export const NumberPicker: React.FC<NumberPickerProps> = connect(
  InputNumber,
  mapProps((props) => {
    return {
      ...props,
    };
  }),
  mapReadPretty(PreviewText.NumberPicker),
);

export default NumberPicker;
