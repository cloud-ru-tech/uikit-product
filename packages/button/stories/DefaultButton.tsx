import { styled } from '@linaria/react';
import { CopySVG } from '@sbercloud/icons';
import { H4 } from '@sbercloud/uikit-typography';
import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Button, ButtonProps } from '../src';
import { ButtonVariant } from '../src/helpers/constants';

export default {
  title: 'Not stable/Button/Default',
  component: Button,
  decorators: [addReadme, withDesign],
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
  variant: ButtonVariant;
  background?: string;
}> = [
  { name: 'FILLED', variant: ButtonVariant.Filled },
  { name: 'FILLED-BRAND', variant: ButtonVariant.FilledBrand },
  { name: 'OUTLINED', variant: ButtonVariant.Outlined },
  { name: 'TRANSPARENT', variant: ButtonVariant.Transparent },
  { name: 'TABLE-MENU', variant: ButtonVariant.TableMenu },
  { name: 'WHITE', variant: ButtonVariant.White, background: '#5558FA' },
];

const Template: Story<ButtonProps & { showIcon: boolean }> = ({ children, showIcon, ...args }) => (
  <Group>
    {buttons.map(({ name, variant, background }) => (
      <Item key={name} background={background}>
        <Title>
          <H4 style={{ color: background ? '#fff' : undefined }}>{name}</H4>
        </Title>
        <Button {...args} variant={variant} icon={showIcon || variant === 'table-menu' ? <CopySVG /> : null}>
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
Default.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
Default.argTypes = {
  showIcon: {
    control: {
      type: 'boolean',
    },
  },
};
