import { Meta, Story } from '@storybook/react';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { HeaderProjectSelector, HeaderProjectSelectorProps } from '../src';

export default {
  title: 'Not stable/Navigation/Header Project Selector',
  component: HeaderProjectSelector,
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=331%3A8119',
    },
  },
} as Meta;

const Template: Story<HeaderProjectSelectorProps> = args => {
  const [value, setValue] = useState(args.value);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return <HeaderProjectSelector {...args} onChange={setValue} value={value} />;
};

export const projects = Template.bind({});
projects.args = {
  value: 'short-0',
  items: [
    { label: 'Zialactic', value: 'short-0' },
    { label: 'Zaggles', value: 'short-1' },
    { label: 'Isologia', value: 'short-2' },
    { label: 'Undertap', value: 'short-3' },
    { label: 'Gluid', value: 'short-4' },
    { label: 'Insource', value: 'short-5' },
    { label: 'Mantrix', value: 'short-6' },
    { label: 'Datagen', value: 'short-7' },
    { label: 'Isologics', value: 'short-8' },
    { label: 'Zork', value: 'short-9' },
    { label: 'Paragonia Waretel Ozean Tropolis Isologix Datagen Rooforia Concility', value: 'long-0' },
    { label: 'Ovium', value: 'short-11' },
    { label: 'Rooforia', value: 'short-12' },
    { label: 'Tellifly', value: 'short-13' },
    { label: 'Rocklogic', value: 'short-14' },
  ],
};

export const projectsWithCatalogs = Template.bind({});
projectsWithCatalogs.args = {
  value: 'short-0',
  items: [
    {
      label: 'Zensus',
      projects: [
        { label: 'Zialactic', value: 'short-0' },
        { label: 'Zaggles', value: 'short-1' },
        { label: 'Isologia', value: 'short-2' },
        { label: 'Undertap', value: 'short-3' },
        { label: 'Gluid', value: 'short-4' },
      ],
    },
    {
      label: 'Chillium',
      projects: [
        { label: 'Insource', value: 'short-5' },
        { label: 'Mantrix', value: 'short-6' },
        { label: 'Datagen', value: 'short-7' },
        { label: 'Isologics', value: 'short-8' },
        { label: 'Zork', value: 'short-9' },
      ],
    },
    {
      label: 'Unia',
      projects: [
        { label: 'Paragonia Waretel Ozean Tropolis Isologix Datagen Rooforia Concility', value: 'long-0' },
        { label: 'Ovium', value: 'short-11' },
        { label: 'Rooforia', value: 'short-12' },
        { label: 'Tellifly', value: 'short-13' },
        { label: 'Rocklogic', value: 'short-14' },
      ],
    },
  ],
};

export const projectsWithWorkspaces = Template.bind({});
projectsWithWorkspaces.args = {
  value: 'short-0',
  items: [
    {
      label: 'Zensus',
      workspaces: [
        { label: 'Zialactic', value: 'short-0' },
        { label: 'Zaggles', value: 'short-1' },
        { label: 'Isologia', value: 'short-2' },
        { label: 'Undertap', value: 'short-3' },
        { label: 'Gluid', value: 'short-4' },
      ],
    },
    {
      label: 'Chillium',
      workspaces: [
        { label: 'Insource', value: 'short-5' },
        { label: 'Mantrix', value: 'short-6' },
        { label: 'Datagen', value: 'short-7' },
        { label: 'Isologics', value: 'short-8' },
        { label: 'Zork', value: 'short-9' },
      ],
    },
    {
      label: 'Unia',
      workspaces: [
        { label: 'Paragonia Waretel Ozean Tropolis Isologix Datagen Rooforia Concility', value: 'long-0' },
        { label: 'Ovium', value: 'short-11' },
        { label: 'Rooforia', value: 'short-12' },
        { label: 'Tellifly', value: 'short-13' },
        { label: 'Rocklogic', value: 'short-14' },
      ],
    },
  ],
};
