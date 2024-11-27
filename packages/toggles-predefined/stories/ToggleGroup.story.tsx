import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { PlaceholderSVG } from '@sbercloud/uikit-product-icons';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ToggleCard, ToggleGroup, ToggleGroupProps } from '../src';

const meta: Meta = {
  title: 'Console/Toggles Predefined/Toggle Group',
  component: ToggleGroup,
};
export default meta;

type StoryProps = ToggleGroupProps;

function Template({ selectionMode, ...args }: StoryProps) {
  const [value, setValue] = useState<string | string[] | undefined>(selectionMode === 'single' ? undefined : []);

  useEffect(() => {
    setValue(selectionMode === 'single' ? undefined : []);
  }, [selectionMode]);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <ToggleGroup {...args} selectionMode='multiple' value={value} onChange={setValue}>
      <ToggleCard
        title='Базовые образы'
        value='1'
        emblem={{ icon: PlaceholderSVG, decor: false }}
        description={'Готовые Docker-образы с популярными инструментами для обучения и инференса'}
      />
      <ToggleCard
        title='Модели'
        value='2'
        emblem={{ icon: PlaceholderSVG, decor: false }}
        description={'Доступные для дообучения и инференса'}
      />
      <ToggleCard
        title='Базовые образы'
        value='3'
        disabled
        emblem={{ icon: PlaceholderSVG, decor: false }}
        description={'Готовые Docker-образы с популярными инструментами для обучения и инференса'}
      />
    </ToggleGroup>
  );
}

export const toggleGroup: StoryObj<StoryProps> = {
  render: Template,

  args: {
    orientation: 'vertical',
    selectionMode: 'single',
    gap: 's',
  },

  argTypes: {},

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    badges: [BADGE.STABLE],
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=12824%3A200633',
    },
  },
};
