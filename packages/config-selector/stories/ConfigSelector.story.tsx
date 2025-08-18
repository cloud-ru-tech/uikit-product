import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ConfigSelector, ConfigSelectorProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Config Selector',
  component: ConfigSelector,
};
export default meta;

const tipProps = {
  availableTip: 'Доступное значение в рамках флейвора',
  disabledTip: (
    <span>
      Квота исчерпана, значение недоступно. <ins>Увеличить</ins>
    </span>
  ),
};

const Template: StoryFn<ConfigSelectorProps> = ({ ...args }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className={styles.wrapper}>
      <ConfigSelector {...args} checked={isChecked} onChange={setIsChecked} />
      <ConfigSelector label='24' onChange={() => {}} checked={true} {...tipProps} available />
      <ConfigSelector label='32' onChange={() => {}} checked={false} {...tipProps} />
      <ConfigSelector label='64' onChange={() => {}} checked={false} {...tipProps} available />
      <ConfigSelector label='128-2048' onChange={() => {}} checked={false} {...tipProps} disabled />
    </div>
  );
};

export const configSelector: StoryObj<ConfigSelectorProps> = {
  render: Template,
  args: {
    label: '16',
    ...tipProps,
    available: true,
    disabled: false,
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
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/z85sLht8LcHu8nk9LnF5Lr/Product-UI-Kit?node-id=34427-8434',
    },
  },
};
