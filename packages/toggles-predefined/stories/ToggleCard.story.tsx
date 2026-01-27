import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ModelInterfaceSVG } from '@cloud-ru/uikit-product-icons';
import { ToggleGroup } from '@snack-uikit/toggles';

import { BADGE } from '../../../storybook/constants';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ToggleCard, ToggleCardProps } from '../src';

const meta: Meta = {
  title: 'Console/Toggles Predefined/Card',
  component: ToggleCard,
};
export default meta;

type StoryProps = ToggleCardProps & { showIcon: boolean };

function Template({ showIcon, ...args }: StoryProps) {
  const [value, setValue] = useState<string[]>();

  return (
    <ToggleGroup selectionMode='multiple' value={value} onChange={setValue}>
      <ToggleCard {...args} value={'1'} {...(showIcon ? { emblem: { icon: ModelInterfaceSVG, decor: false } } : {})} />
    </ToggleGroup>
  );
}

export const card: StoryObj<StoryProps> = {
  render: Template,
  args: { title: 'Title', showIcon: true, description: 'Description' },

  argTypes: {
    showIcon: {
      type: 'boolean',
      name: '[Stories]: Show or not Icon',
    },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    badges: [BADGE.STABLE],
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/SZjPEs7Ac3a2wS0HapamrE/Product-components?type=design&node-id=697%3A47152&mode=design&t=oypEAXRKMeKhGojX-1',
    },
  },
};
