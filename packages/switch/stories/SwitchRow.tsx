import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useEffect, useState } from 'react';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SwitchRow as SwitchComponent, SwitchRowProps } from '../src';

export default {
  title: 'Components/Switch/Switch Row',
  component: SwitchComponent,
} as Meta;

const Container = styled.div<{ theme: Themes }>`
  padding: 20px;
  border: 1px solid var(${EXPORT_VARS.GREY[100]});
  border-radius: 20px;
  background-color: ${({ theme }) => (['purple', 'green'].includes(theme) ? '#ffffff' : '#333333')};
`;

const Template: Story<SwitchRowProps> = ({ checked: propsChecked, ...args }, { globals: { theme } }) => {
  const [checked, setChecked] = useState(propsChecked || false);

  useEffect(() => {
    setChecked(propsChecked);
  }, [propsChecked]);

  return (
    <Container theme={theme}>
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
};
SwitchRow.argTypes = {};
SwitchRow.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Design-System-2.0--%3E-Atoms?node-id=3457%3A45858',
  },
  badges: [BADGE.STABLE],
};
