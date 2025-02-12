import { createForm } from '@formily/core';
import { observer } from '@formily/react';
import { createBehavior, createResource } from '@trionesdev/designable-core';
import { DnFC, useCssInJs, usePrefix } from '@trionesdev/designable-react';
import cls from 'classnames';
import React, { useMemo } from 'react';
import { AllLocales } from '../../../locales';
import { AllSchemas } from '../../../schemas';
import { Form as FormilyForm } from './Form';
import { genFormStyle } from './styles';
// import './styles.less'

export const Form: DnFC<React.ComponentProps<typeof FormilyForm>> = observer((props) => {
  const prefix = usePrefix('designable-form');
  const { hashId, wrapSSR } = useCssInJs({ prefix, styleFun: genFormStyle });
  const form = useMemo(
    () =>
      createForm({
        designable: true,
      }),
    [],
  );
  return wrapSSR(
    <FormilyForm {...props} style={{ ...props.style }} className={cls(prefix, hashId)} form={form}>
      {props.children}
    </FormilyForm>,
  );
});

Form.Behavior = createBehavior({
  name: 'Form',
  selector: (node) => node.componentName === 'Form',
  designerProps(node) {
    return {
      draggable: !node.isRoot,
      cloneable: !node.isRoot,
      deletable: !node.isRoot,
      droppable: true,
      propsSchema: {
        type: 'object',
        properties: AllSchemas.Form.properties,
      },
      defaultProps: {
        labelCol: 6,
        wrapperCol: 12,
      },
    };
  },
  designerLocales: AllLocales.Form,
});

Form.Resource = createResource({
  title: { 'zh-CN': '表单', 'en-US': 'Form' },
  icon: 'FormLayoutSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'object',
        'x-component': 'Form',
      },
    },
  ],
});
