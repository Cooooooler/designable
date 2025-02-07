import {
  ArrayTable,
  Cascader,
  DatePicker,
  Editable,
  FormCollapse,
  FormGrid,
  FormItem,
  FormLayout,
  FormTab,
  PreviewText,
  Reset,
  Space,
  Submit,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
} from '@formily/antd-v5';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { TreeNode } from '@trionesdev/designable-core';
import { transformToSchema } from '@trionesdev/designable-formily-transformer';
import { IDesignerComponents } from '@trionesdev/designable-react';
import { Slider } from 'antd';
import React, { useMemo } from 'react';
import {
  Card,
  Checkbox,
  Form,
  Input,
  NumberPicker,
  Password,
  Radio,
  Rate,
  Select,
} from './components/src';
import { ArrayCards } from './components/src/array-cards/ArrayCards';

const Text: React.FC<{
  value?: string;
  content?: string;
  mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'p';
}> = ({ value, mode, content, ...props }) => {
  const tagName = mode === 'normal' || !mode ? 'div' : mode;
  return React.createElement(tagName, props, value || content);
};

const SchemaField = createSchemaField({
  components: {
    Space,
    FormGrid,
    FormLayout,
    FormTab,
    FormCollapse,
    ArrayTable,
    ArrayCards,
    FormItem,
    DatePicker,
    Checkbox,
    Cascader,
    Editable,
    Input,
    Text,
    NumberPicker,
    Switch,
    Password,
    PreviewText,
    Radio,
    Reset,
    Select,
    Submit,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
    Card,
    Slider,
    Rate,
  },
});

export interface IPreviewWidgetProps {
  tree: TreeNode;
  components?: IDesignerComponents;
}

export const PreviewWidget: React.FC<IPreviewWidgetProps> = (props) => {
  const form = useMemo(() => createForm(), []);
  const { form: formProps, schema } = transformToSchema(props.tree);
  console.log(formProps);
  return (
    <Form {...formProps} form={form}>
      <SchemaField schema={schema} />
    </Form>
  );
};
