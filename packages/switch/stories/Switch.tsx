import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Switch as SwitchComponent, SwitchProps } from '../src';

export default {
  title: 'Components/Switch/Switch',
  component: SwitchComponent,
} as Meta;

const Container = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(${themeVars.sys.neutral.decorDefault});
  border-radius: 10%;
  background-color: var(${themeVars.sys.neutral.background2Level});
`;

const Template: StoryFn<SwitchProps> = ({ checked: propsChecked, size, ...args }) => {
  const [checked, setChecked] = useState(propsChecked || false);
  const [key, setKey] = useState(0);
  useEffect(() => setKey(x => x + 1), [size]);
  return (
    <Container>
      <SwitchComponent {...args} onChange={setChecked} size={size} checked={checked} key={key} />
    </Container>
  );
};

export const Switch = Template.bind({});
Switch.argTypes = {};
Switch.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=3457%3A45858',
  },
  badges: [BADGE.STABLE],
};
