import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SWITCH_ROW_TYPES, SwitchRow, SwitchRowProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Switch Row ',
  component: SwitchRow,
};
export default meta;

function Template({ checked: propsChecked, ...args }: SwitchRowProps) {
  const [checked, setChecked] = useState(propsChecked || false);

  useEffect(() => {
    setChecked(propsChecked);
  }, [propsChecked]);

  return (
    <div className={styles.container}>
      <SwitchRow {...args} onChange={setChecked} checked={checked} />
    </div>
  );
}

export const switchRow: StoryObj<SwitchRowProps> = {
  render: Template,

  args: {
    title: 'Intel Xeon Высокопроизводительный процессор для серверов 3-го поколения',
    disableTitleTruncate: false,
    description:
      'Идейные соображения высшего порядка, а также убеждённость некоторых оппонентов говорит о возможностях стандартных подходов. Принимая во внимание показатели успешности, высококачественный прототип будущего проекта однозначно ва...',
    tip: 'Tip',
    disabledToggleTip: 'disabledToggleTip',
    type: SWITCH_ROW_TYPES.Block,
    disabled: false,
    checked: false,
    loading: false,
  },

  argTypes: {},

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/SZjPEs7Ac3a2wS0HapamrE/Product-components?type=design&node-id=663%3A9489&mode=design&t=JRsQdrsf6lNlwErM-1',
    },
  },
};
