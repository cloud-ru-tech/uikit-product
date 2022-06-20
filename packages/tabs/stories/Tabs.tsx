import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { Divider } from '@sbercloud/uikit-product-divider';
import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Tabs } from '../src';

export default {
  title: 'Components/Tabs',
  component: Tabs.Container,
} as Meta;

const Container = styled.div<{ theme: Themes }>`
  margin-top: 16px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid var(${EXPORT_VARS.GREY[100]});
  border-radius: 8px;
  background-color: ${({ theme }) => (['purple', 'green'].includes(theme) ? '#ffffff' : '#333333')};
  padding: 12px;

  &:not(:last-child) {
    margin-bottom: 24px;
  }
`;

const Template: Story<Tabs.ContainerProps & { 'data-test-id'?: string; className?: string }> = (
  { ...args },
  { globals: { theme } },
) => {
  const [currentTab, setCurrentTab] = useState(args.value || 'id2');
  return (
    <Tabs.Container {...args} value={args.value || currentTab} onChange={setCurrentTab}>
      <Tabs.Navigation data-test-id={args['data-test-id']} className={args.className}>
        <Tabs.NavigationItem value={'id1'} label={'First'} />
        <Tabs.NavigationItem value={'id2'} label={'Second'} counter={1} />
        <Tabs.NavigationItem value={'id3'} label={'Third'} disabled />
        <Tabs.NavigationItem value={'id4'} label={'Fourth'} counter={123} />
        <Tabs.NavigationItem value={'id5'} label={'Fifth'} disabled={currentTab !== 'id4'} />
      </Tabs.Navigation>
      <Divider />
      <Container theme={theme}>
        <Tabs.Content value={'id1'}>FIRST</Tabs.Content>
        <Tabs.Content value={'id2'}>SECOND</Tabs.Content>
        <Tabs.Content value={'id3'}>THIRD</Tabs.Content>
        <Tabs.Content value={'id4'}>FOURTH</Tabs.Content>
        <Tabs.Content value={'id5'}>FIFTH</Tabs.Content>
      </Container>
    </Tabs.Container>
  );
};

export const tabs = Template.bind({});
tabs.args = {};
tabs.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=4824%3A65492',
  },
  badges: [BADGE.STABLE],
};
tabs.argTypes = {
  value: {
    options: ['id1', 'id2', 'id3', 'id4', 'id5'],
    control: { type: 'radio' },
  },
  'data-test-id': {
    defaultValue: 'tabs__navigation-container',
    control: { type: 'text' },
  },
  className: {
    defaultValue: 'controlled-classname',
    control: { type: 'text' },
  },
};
