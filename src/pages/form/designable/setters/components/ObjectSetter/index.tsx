import { ArrayTable, Form, FormCollapse, FormItem, Input, Select } from '@formily/antd-v5';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { clone } from '@formily/shared';
import { GlobalRegistry } from '@trionesdev/designable-core';
import { TextWidget, useCssInJs, usePrefix } from '@trionesdev/designable-react';
import { requestIdle } from '@trionesdev/designable-shared';
import { Button, Card, Modal, Tag, Tooltip } from 'antd';
import cls from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { MonacoInput } from '../../../react-settings-form';
import { initDeclaration } from './declarations';
import { FieldPropertySetter } from './FieldPropertySetter';
import { FulfillRunHelper } from './helpers';
import { PathSelector } from './PathSelector';
import { genReactionsSetterStyle } from './styles';
import { IReaction } from './types';

export interface IObjectSetterProps {
  value?: IReaction;
  onChange?: (value: IReaction) => void;
}

const TypeView = ({ value }: { value: any }) => {
  const text = String(value);
  if (text.length <= 26) return <Tag>{text}</Tag>;
  return (
    <Tag>
      <Tooltip
        title={
          <div style={{ fontSize: 12 }}>
            <code>
              <pre style={{ whiteSpace: 'pre-wrap', padding: 0, margin: 0 }}>{text}</pre>
            </code>
          </div>
        }
      >
        {text.substring(0, 24)}...
      </Tooltip>
    </Tag>
  );
};

const SchemaField = createSchemaField({
  components: {
    Card,
    FormCollapse,
    Input,
    TypeView,
    Select,
    FormItem,
    PathSelector,
    FieldPropertySetter,
    ArrayTable,
    MonacoInput,
  },
});

export const ObjectSetter: React.FC<IObjectSetterProps> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [innerVisible, setInnerVisible] = useState(false);
  const prefix = usePrefix('reactions-setter');
  const { hashId, wrapSSR } = useCssInJs({
    prefix,
    styleFun: genReactionsSetterStyle,
  });
  const form = useMemo(() => {
    return createForm({
      values: clone(props.value),
    });
  }, [modalVisible, props.value]);
  const formCollapse = useMemo(() => FormCollapse.createFormCollapse(['run']), [modalVisible]);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  useEffect(() => {
    if (modalVisible) {
      requestIdle(
        () => {
          initDeclaration().then(() => {
            setInnerVisible(true);
          });
        },
        {
          timeout: 400,
        },
      );
    } else {
      setInnerVisible(false);
    }
  }, [modalVisible]);
  return wrapSSR(
    <>
      <Button block onClick={openModal}>
        <TextWidget token="SettingComponents.ReactionsSetter.configureReactions" />
      </Button>
      <Modal
        title={GlobalRegistry.getDesignerMessage(
          'SettingComponents.ReactionsSetter.configureReactions',
        )}
        width="70%"
        centered
        bodyStyle={{ padding: 10 }}
        transitionName=""
        maskTransitionName=""
        open={modalVisible}
        onCancel={closeModal}
        destroyOnClose
        onOk={() => {
          form.submit((values) => {
            props.onChange?.(values);
            console.log(values);
          });
          closeModal();
        }}
      >
        <div className={cls(prefix, hashId)}>
          {innerVisible && (
            <Form form={form}>
              <SchemaField>
                <SchemaField.Void
                  x-component="FormCollapse"
                  x-component-props={{
                    ...formCollapse,
                    defaultActiveKey: ['run'],
                    style: { marginBottom: 10 },
                  }}
                >
                  <SchemaField.Void
                    x-component="FormCollapse.CollapsePanel"
                    x-component-props={{
                      key: 'run',
                      header: GlobalRegistry.getDesignerMessage(
                        'SettingComponents.ReactionsSetter.actionReactions',
                      ),
                      className: 'reaction-runner',
                    }}
                  >
                    <SchemaField.String
                      name="run"
                      x-component="MonacoInput"
                      x-component-props={{
                        width: '100%',
                        height: 400,
                        language: 'typescript',
                        helpCode: FulfillRunHelper,
                        options: {
                          minimap: {
                            enabled: false,
                          },
                        },
                      }}
                      x-reactions={(field) => {
                        const deps = field.query('dependencies').value();
                        if (Array.isArray(deps)) {
                          field.componentProps.extraLib = `
                          declare var $deps : {
                            ${deps.map(({ name, type }) => {
                              if (!name) return '';
                              return `${name}?:${type || 'any'},`;
                            })}
                          }
                          `;
                        }
                      }}
                    />
                  </SchemaField.Void>
                </SchemaField.Void>
              </SchemaField>
            </Form>
          )}
        </div>
      </Modal>
    </>,
  );
};
