import { Story, Meta } from '@storybook/react/types-6-0';
import { styled } from '@linaria/react';

import { CopySVG } from '@aicloud/ui-icons';

import { H4 } from 'typography/Headers';

import { Button, IButtonProps } from './Button';
import { TButtonTypes } from './types';

export default {
  title: 'Components/Button/Default',
  component: Button,
} as Meta;

const Group = styled.div`
  display: flex;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-left: 42px;
`;

const Title = styled.div`
  margin-bottom: 12px;
`;

const buttons: Array<{
  name: string;
  type: TButtonTypes;
  icon?: React.ReactNode;
}> = [
  { name: 'FILLED', type: 'filled' },
  { name: 'OUTLINED', type: 'outlined' },
  { name: 'TRANSPERENT', type: 'transparent' },
  { name: 'WHITE', type: 'white' },
  { name: 'WITH_ICON', type: 'filled', icon: <CopySVG /> },
];

const Template: Story<IButtonProps> = ({ children, ...args }) => (
  <Group>
    {buttons.map(({ name, type, icon }) => (
      <Item key={name}>
        <Title>
          <H4>{name}</H4>
        </Title>
        <Button {...args} type={type} icon={icon}>
          {children}
        </Button>
      </Item>
    ))}
  </Group>
);

export const Default = Template.bind({});

Default.args = {
  children: 'Button',
  iconPosition: 'after',
};

Default.argTypes = {};
