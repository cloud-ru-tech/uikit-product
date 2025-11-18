import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SelectorPlatformDropList, SelectorPlatformDropListProps } from '../src/components';

const meta: Meta = {
  title: 'Site/Selector Platform DropList',
  component: SelectorPlatformDropList,
};
export default meta;

const Template: StoryFn<SelectorPlatformDropListProps> = ({ ...args }) => {
  const [valueMulti, setValueMulti] = useState<string[]>([]);
  const [valueSingle, setValueSingle] = useState<string | undefined>(undefined);

  const handleChangSingle = (newValue: string | undefined) => {
    setValueSingle(newValue);
  };

  if (args.mode === 'single') {
    return <SelectorPlatformDropList {...args} value={valueSingle} onChange={handleChangSingle} mode='single' />;
  }

  const handleChangeMulti = (newValue: Array<string>) => {
    setValueMulti([...newValue]);
  };

  return <SelectorPlatformDropList {...args} value={valueMulti} onChange={handleChangeMulti} mode='multiple' />;
};

export const selectorPlatformDropList: StoryObj<SelectorPlatformDropListProps> = {
  render: Template,
  args: {
    layoutType: 'desktop',
    mode: 'multiple',
    items: [
      {
        type: 'all',
        onClick: () => {},
      },
      {
        type: 'evolution',
        onClick: () => {},
      },
      {
        type: 'vmware',
        onClick: () => {},
      },
      {
        type: 'advanced',
        onClick: () => {},
      },
    ],
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/branch/ckF7bzbI85q9xE9oSCvhF2/-LIB--SITE--Product-UI-Kit?node-id=24154-4710&m=dev',
    },
  },
};
