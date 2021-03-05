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

const Item = styled.div<{ background?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px 20px;
  border-radius: 4px;
  background-color: ${({ background }) => background || 'transparent'};
`;

const Title = styled.div`
  margin-bottom: 12px;
`;

const buttons: Array<{
  name: string;
  type: TButtonTypes;
  background?: string;
}> = [
  { name: 'FILLED', type: 'filled' },
  { name: 'OUTLINED', type: 'outlined' },
  { name: 'TRANSPERENT', type: 'transparent' },
  { name: 'WHITE', type: 'white', background: '#5558FA' },
];

const Template: Story<IButtonProps & { showIcon: boolean }> = ({
  children,
  showIcon,
  ...args
}) => (
  <Group>
    {buttons.map(({ name, type, background }) => (
      <Item key={name} background={background}>
        <Title>
          <H4 color={background ? '#fff' : ''}>{name}</H4>
        </Title>
        <Button {...args} type={type} icon={showIcon ? <CopySVG /> : null}>
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

Default.argTypes = {
  showIcon: {
    control: {
      type: 'boolean',
    },
  },
};
