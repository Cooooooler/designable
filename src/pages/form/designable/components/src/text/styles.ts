import { CSSInterpolation } from '@ant-design/cssinjs';
import { GlobalToken } from 'antd';

export const genTextStyle = (prefixCls: string, token: GlobalToken): CSSInterpolation => {
  return {
    [`.${prefixCls}`]: {
      [`&:empty::before`]: {
        content: 'Please Input',
        display: 'block',
        opacity: 0.6,
      },
      [`&:focus`]: {
        padding: `4px`,
      },
    },
  };
};
