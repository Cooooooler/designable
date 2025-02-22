import React from 'react';
import { Switch as AntdSwitch } from './Switch';
import { createBehavior, createResource } from '@trionesdev/designable-core';
import { DnFC } from '@trionesdev/designable-react';
import { createFieldSchema } from '../Field';
import { AllSchemas } from '../../../schemas';
import { AllLocales } from '../../../locales';

export const Switch: DnFC<React.ComponentProps<typeof AntdSwitch>> = AntdSwitch;

Switch.Behavior = createBehavior({
  name: 'Switch',
  extends: ['Field'],
  selector: (node) => node.props?.['x-component'] === 'Switch',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.Switch),
  },
  designerLocales: AllLocales.Switch,
});

Switch.Resource = createResource({
  icon: 'SwitchSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'boolean',
        title: 'Switch',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
    },
  ],
});
