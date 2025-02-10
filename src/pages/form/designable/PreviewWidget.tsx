import {
  ArrayTable,
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
} from '@formily/antd-v5';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { TreeNode } from '@trionesdev/designable-core';
import { transformToSchema } from '@trionesdev/designable-formily-transformer';
import { IDesignerComponents } from '@trionesdev/designable-react';
import React, { useMemo } from 'react';
import {
  Card,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  NumberPicker,
  Password,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  Text,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
} from './components/src';
import { ArrayCards } from './components/src/array-cards/ArrayCards';

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
    Text,
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
