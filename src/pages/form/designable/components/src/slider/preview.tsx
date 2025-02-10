import React from 'react';
import { Slider as FormilyTreeSelect } from './Slider';
import { createBehavior, createResource } from '@trionesdev/designable-core';
import { DnFC } from '@trionesdev/designable-react';
import { createFieldSchema } from '../Field';
import { AllSchemas } from '../../../schemas';
import { AllLocales } from '../../../locales';

export const Slider: DnFC<React.ComponentProps<typeof FormilyTreeSelect>> =
  FormilyTreeSelect;

Slider.Behavior = createBehavior({
  name: 'Slider',
  extends: ['Field'],
  selector: (node) => node.props?.['x-component'] === 'Slider',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.Slider),
  },
  designerLocales: AllLocales.Slider,
});

Slider.Resource = createResource({
  icon: 'SliderSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        title: 'Slider',
        'x-decorator': 'FormItem',
        'x-component': 'Slider',
      },
    },
  ],
});
