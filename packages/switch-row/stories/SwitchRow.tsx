import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SwitchRow, SwitchRowProps } from '../src';

const meta: Meta = {
  title: 'Snack Uikit/Switch Row ',
  component: SwitchRow,
};
export default meta;

const Container = styled.div`
  padding: ${themeVars.dimension['3m']};
  border: 1px solid ${themeVars.sys.neutral.decorDefault};
  border-radius: ${themeVars.dimension['3m']};
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
    url: 'https://www.figma.com/file/SZjPEs7Ac3a2wS0HapamrE/Product-components?type=design&node-id=663%3A9489&mode=design&t=JRsQdrsf6lNlwErM-1',
  },
};
