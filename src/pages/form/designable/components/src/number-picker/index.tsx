import { connect, mapReadPretty } from '@formily/react'
import { InputNumber } from 'antd'
import { PreviewText } from '../preview-text'
import { InputNumberProps } from 'antd/es/input-number'

type NumberPickerProps = InputNumberProps;

export const NumberPicker: React.FC<NumberPickerProps> = connect(
  InputNumber,
  mapReadPretty(PreviewText.NumberPicker)
)

export default NumberPicker
