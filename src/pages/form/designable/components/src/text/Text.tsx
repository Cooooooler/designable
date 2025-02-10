import { connect, mapProps } from '@formily/react';
import { Typography as AntdText } from 'antd';

export const Typography = connect(
  AntdText,
  mapProps((props, field) => {
    console.log(props, field, 'text');
    return {
      ...props,
    };
  }),
);

export default Typography;
