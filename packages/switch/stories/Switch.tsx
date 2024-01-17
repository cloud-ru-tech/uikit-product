import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Switch as SwitchComponent, SwitchProps } from '../src';

const meta: Meta = {
  title: 'Components/Switch/Switch',
  component: SwitchComponent,
};
export default meta;

const Container = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${themeVars.sys.neutral.decorDefault};
  border-radius: 10%;
  background-color: ${themeVars.sys.neutral.background2Level};
`;

function Template({ checked: propsChecked, size, ...args }: SwitchProps) {
  const [checked, setChecked] = useState(propsChecked || false);
  const [key, setKey] = useState(0);
  useEffect(() => setKey(x => x + 1), [size]);
  return (
    <Container>
      <SwitchComponent {...args} onChange={setChecked} size={size} checked={checked} key={key} />
    </Container>
  );
}

export const Switch: StoryFn<SwitchProps> = Template.bind({});
Switch.argTypes = {};
Switch.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=3457%3A45858',
  },
  badges: [BADGE.STABLE],
};
