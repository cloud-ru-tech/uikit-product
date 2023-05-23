import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SwitchRow as SwitchComponent, SwitchRowProps } from '../src';

export default {
  title: 'Components/Switch/Switch Row',
  component: SwitchComponent,
} as Meta;

const Container = styled.div`
  padding: 20px;
  border: 1px solid var(${themeVars.sys.neutral.decorDefault});
  border-radius: 20px;
  background-color: var(${themeVars.sys.neutral.background2Level});
`;

const Template: StoryFn<SwitchRowProps> = ({ checked: propsChecked, ...args }) => {
  const [checked, setChecked] = useState(propsChecked || false);

  useEffect(() => {
    setChecked(propsChecked);
  }, [propsChecked]);

  return (
    <Container>
      <SwitchComponent {...args} onChange={setChecked} checked={checked} />
    </Container>
  );
};

export const SwitchRow = Template.bind({});
SwitchRow.args = {
  title: 'Intel Xeon Высокопроизводительный процессор для серверов 3-го поколения',
  description:
    'Идейные соображения высшего порядка, а также убеждённость некоторых оппонентов говорит о возможностях стандартных подходов. Принимая во внимание показатели успешности, высококачественный прототип будущего проекта однозначнова...',
  tooltip: {
    content: 'test',
  },
  checked: false,
};
SwitchRow.argTypes = {};
SwitchRow.parameters = {
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
