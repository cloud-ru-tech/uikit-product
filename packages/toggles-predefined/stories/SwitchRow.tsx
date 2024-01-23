import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SwitchRow, SwitchRowProps } from '../src';

const meta: Meta = {
  title: 'Snack Uikit/Toggles Predefined/Switch Row ',
  component: SwitchRow,
};
export default meta;

const Container = styled.div`
  padding: 20px;
  border: 1px solid ${themeVars.sys.neutral.decorDefault};
  border-radius: 20px;
  background-color: ${themeVars.sys.neutral.background2Level};
`;

function Template({ checked: propsChecked, ...args }: SwitchRowProps) {
  const [checked, setChecked] = useState(propsChecked || false);

  useEffect(() => {
    setChecked(propsChecked);
  }, [propsChecked]);

  return (
    <Container>
      <SwitchRow {...args} onChange={setChecked} checked={checked} />
    </Container>
  );
}

export const switchRow: StoryFn<SwitchRowProps> = Template.bind({});
switchRow.args = {
  title: 'Intel Xeon Высокопроизводительный процессор для серверов 3-го поколения',
  description:
    'Идейные соображения высшего порядка, а также убеждённость некоторых оппонентов говорит о возможностях стандартных подходов. Принимая во внимание показатели успешности, высококачественный прототип будущего проекта однозначнова...',
  tip: 'Tip',
  disabledToggleTip: 'disabledToggleTip',
  disabled: false,
  checked: false,
};
switchRow.argTypes = {};
switchRow.parameters = {
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
