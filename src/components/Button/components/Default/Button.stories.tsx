import { Story, Meta } from '@storybook/react/types-6-0';
import { styled } from '@linaria/react';

import { CopySVG } from '@sbercloud/icons';

import { H4 } from 'typography/Headers';
import { TButtonVariant } from 'components/Button/helpers/types';

import { Button, IButtonProps } from './Button';

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
  variant: TButtonVariant;
  background?: string;
}> = [
  { name: 'FILLED', variant: 'filled' },
  { name: 'FILLED-BRAND', variant: 'filled-brand' },
  { name: 'OUTLINED', variant: 'outlined' },
  { name: 'TRANSPARENT', variant: 'transparent' },
  { name: 'TABLE-MENU', variant: 'table-menu' },
  { name: 'WHITE', variant: 'white', background: '#5558FA' },
];

const Template: Story<IButtonProps & { showIcon: boolean }> = ({
  children,
  showIcon,
  ...args
}) => (
  <Group>
    {buttons.map(({ name, variant, background }) => (
      <Item key={name} background={background}>
        <Title>
          <H4 color={background ? '#fff' : ''}>{name}</H4>
        </Title>
        <Button
          {...args}
          variant={variant}
          icon={showIcon || variant === 'table-menu' ? <CopySVG /> : null}
        >
          {variant !== 'table-menu' && children}
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
