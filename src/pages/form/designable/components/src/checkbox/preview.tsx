import { createBehavior, createResource } from '@trionesdev/designable-core';
import { DnFC } from '@trionesdev/designable-react';
import React from 'react';
import { AllLocales } from '../../../locales';
import { AllSchemas } from '../../../schemas';
import { createFieldSchema } from '../Field';
import { Checkbox as FormilyCheckbox } from './Checkbox';

export const Checkbox: DnFC<React.ComponentProps<typeof FormilyCheckbox>> = FormilyCheckbox;

Checkbox.Behavior = createBehavior({
  name: 'Checkbox.Group',
  extends: ['Field'],
  selector: (node) => node.props?.['x-component'] === 'Checkbox.Group',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.Checkbox.Group),
  },
  designerLocales: AllLocales.CheckboxGroup,
});

Checkbox.Resource = createResource({
  icon: 'CheckboxGroupSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'Array<string | number>',
        title: 'Checkbox Group',
        'x-decorator': 'FormItem',
        'x-component': 'Checkbox.Group',
        enum: [
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 },
        ],
      },
    },
  ],
});
