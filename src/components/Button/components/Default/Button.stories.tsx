import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { styled } from '@linaria/react';

import { H4 } from 'typography/Headers';
import { Button, IButtonProps } from './Button';

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

const Template: Story<IButtonProps> = ({ children, ...args }) => (
  <Group>
    <Item>
      <Title>
        <H4>FILLED</H4>
      </Title>
      <Button {...args} type='filled'>
        {children}
      </Button>
    </Item>
    <Item>
      <Title>
        <H4>OUTLINED</H4>
      </Title>
      <Button {...args} type='outlined'>
        {children}
      </Button>
    </Item>
    <Item>
      <Title>
        <H4>TRANSPERENT</H4>
      </Title>
      <Button {...args} type='transparent'>
        {children}
      </Button>
    </Item>
  </Group>
);

export const Default = Template.bind({});
Default.args = {
  children: 'Button',
};

Default.argTypes = {};
