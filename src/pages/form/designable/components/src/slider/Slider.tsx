import { connect, mapProps } from '@formily/react';
import { Slider as AntdSlider } from 'antd';

export const Slider = connect(
  AntdSlider,
  mapProps((props) => {
    return {
      ...props,
    };
  }),
);

export default Slider;
