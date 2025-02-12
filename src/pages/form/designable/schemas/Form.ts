import { ObjectSetter } from '@/pages/form/designable/setters';
import { ISchema } from '@formily/react';
import { CSSStyle } from './CSSStyle';
import { FormLayout } from './FormLayout';

export const Form: ISchema = {
  type: 'object',
  properties: {
    onAutoSubmit: {
      'x-decorator': 'FormItem',
      'x-component': ObjectSetter,
    },
    ...(FormLayout.properties as any),

    style: CSSStyle,
  },
};
