import { createBehavior, createResource } from '@trionesdev/designable-core';
import { DnFC, useCssInJs } from '@trionesdev/designable-react';
import { Typography } from 'antd';
import { TypographyProps } from 'antd/es/typography';
import cls from 'classnames';
import React from 'react';
import { AllLocales } from '../../../locales';
import { AllSchemas } from '../../../schemas';
import { createVoidFieldSchema } from '../Field';
import { genTextStyle } from './styles';

export interface IDesignableTextProps extends TypographyProps {
  value?: string;
  content?: string;
  mode?: 'Text' | 'Link' | 'Title' | 'Paragraph';
  style?: React.CSSProperties;
  className?: string;
}

export const Text: DnFC<IDesignableTextProps> = (props) => {
  const prefix = 'dn-text';
  const { hashId, wrapSSR } = useCssInJs({ prefix, styleFun: genTextStyle });
  const { Text, Title, Link, Paragraph } = Typography;
  const childrenNode = (props: IDesignableTextProps) => {
    const content = props.content || 'Please Input';
    switch (props.mode) {
      case 'Link':
        return (
          <Link {...props} className={cls(props.className, prefix, hashId)}>
            {content}
          </Link>
        );
      case 'Title':
        return (
          <Title {...props} className={cls(props.className, prefix, hashId)}>
            {content}
          </Title>
        );
      case 'Paragraph':
        return (
          <Paragraph {...props} className={cls(props.className, prefix, hashId)}>
            {content}
          </Paragraph>
        );
      default:
        return (
          <Text {...props} className={cls(props.className, prefix, hashId)}>
            {content}
          </Text>
        );
    }
  };
  return wrapSSR(
    <Typography {...props} data-content-editable={'x-component-props.content'}>
      {childrenNode(props)}
    </Typography>,
  );
};

Text.Behavior = createBehavior({
  name: 'Text',
  extends: ['Field'],
  selector: (node) => node.props?.['x-component'] === 'Text',
  designerProps: {
    propsSchema: createVoidFieldSchema(AllSchemas.Text),
  },
  designerLocales: AllLocales.Text,
});

Text.Resource = createResource({
  icon: 'TextSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        'x-component': 'Text',
      },
    },
  ],
});
