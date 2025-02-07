import { PageContainer } from '@ant-design/pro-components';
import { createDesigner, GlobalRegistry, KeyCode, Shortcut } from '@trionesdev/designable-core';
import {
  ArrayTable,
  Field,
  Form,
  FormGrid,
  Space,
  Text,
} from '@trionesdev/designable-formily-antd';
import { transformToSchema } from '@trionesdev/designable-formily-transformer';
import {
  ComponentTreeWidget,
  CompositePanel,
  Designer,
  DesignerToolsWidget,
  HistoryWidget,
  IDesignerComponents,
  OutlineTreeWidget,
  ResourceWidget,
  SettingsPanel,
  StudioPanel,
  ToolbarPanel,
  ViewPanel,
  ViewportPanel,
  ViewToolsWidget,
  Workspace,
  WorkspacePanel,
} from '@trionesdev/designable-react';
import { SettingsForm } from '@trionesdev/designable-react-settings-form';
import { Button } from 'antd';
import { useEffect, useMemo } from 'react';
import { JSONTree } from 'react-json-tree';
import {
  ArrayCards,
  Card,
  Checkbox,
  Input,
  NumberPicker,
  Password,
  Radio,
  Rate,
  Select,
} from './components/src';
import { PreviewWidget } from './PreviewWidget';

const theme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633',
};

function Index() {
  const engine = useMemo(
    () =>
      createDesigner({
        shortcuts: [
          new Shortcut({
            codes: [
              [KeyCode.Meta, KeyCode.S],
              [KeyCode.Control, KeyCode.S],
            ],
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            handler(_ctx: any) {
              console.log(JSON.stringify(transformToSchema(engine.getCurrentTree())));
            },
          }),
        ],
        rootComponentName: 'Form',
      }),
    [],
  );

  const handleSave = () => {
    console.log(JSON.stringify(transformToSchema(engine.getCurrentTree())));
  };

  useEffect(() => {
    GlobalRegistry.setDesignerLanguage('zh-cn');
  }, []);

  const components: IDesignerComponents = {
    Form,
    Field,
    Input,
    Rate,
    Radio,
    Select,
    NumberPicker,
    Password,
    ArrayCards,
    ArrayTable,
    Card,
    FormGrid,
    Space,
    Checkbox,
  };

  return (
    <PageContainer content="自定义表单编辑器，可自定义业务组件。">
      <Card
        bordered={false}
        headStyle={{
          display: 'none',
        }}
      >
        <Designer engine={engine}>
          <StudioPanel
            actions={[
              <Button key={'disignable-save'} onClick={handleSave}>
                保存
              </Button>,
            ]}
          >
            <CompositePanel>
              <CompositePanel.Item title="panels.Component" icon="Component">
                <ResourceWidget
                  title="sources.Inputs"
                  sources={[Input, Password, NumberPicker, Rate, Radio, Select, Checkbox]}
                />
                <ResourceWidget title="sources.Layouts" sources={[Card, FormGrid, Space]} />
                <ResourceWidget title="sources.Arrays" sources={[ArrayCards, ArrayTable]} />
                <ResourceWidget title="sources.Displays" sources={[Text]} />
              </CompositePanel.Item>
              <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
                <OutlineTreeWidget />
              </CompositePanel.Item>
              <CompositePanel.Item title="panels.History" icon="History">
                <HistoryWidget />
              </CompositePanel.Item>
            </CompositePanel>
            <Workspace id="form">
              <WorkspacePanel>
                <ToolbarPanel>
                  <DesignerToolsWidget />
                  <ViewToolsWidget use={['DESIGNABLE', 'JSONTREE', 'MARKUP', 'PREVIEW']} />
                </ToolbarPanel>
                <ViewportPanel style={{ height: '100%' }}>
                  <ViewPanel type="DESIGNABLE">
                    {() => <ComponentTreeWidget components={components} />}
                  </ViewPanel>
                  <ViewPanel type="JSONTREE">
                    {() => (
                      <JSONTree
                        theme={theme}
                        invertTheme={false}
                        data={transformToSchema(engine.getCurrentTree())}
                      />
                    )}
                  </ViewPanel>
                  <ViewPanel type={`PREVIEW`}>
                    {(tree) => <PreviewWidget tree={tree} components={components} />}
                  </ViewPanel>
                </ViewportPanel>
              </WorkspacePanel>
            </Workspace>
            <SettingsPanel title="panels.PropertySettings">
              <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
            </SettingsPanel>
          </StudioPanel>
        </Designer>
      </Card>
    </PageContainer>
  );
}

export default Index;
