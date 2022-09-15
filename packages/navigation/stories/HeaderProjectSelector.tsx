import { Meta, Story } from '@storybook/react';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { HeaderProjectSelector, HeaderProjectSelectorProps } from '../src';

export default {
  title: 'Not stable/Navigation/Header Project Selector',
  component: HeaderProjectSelector,
  argTypes: {
    showCreateButton: {
      type: 'boolean',
      name: '[Stories]: show create button',
    },
    showEditButton: {
      type: 'boolean',
      name: '[Stories]: show edit button',
    },
  },
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

const Template: Story<HeaderProjectSelectorProps & { showCreateButton: boolean; showEditButton: boolean }> = ({
  showCreateButton,
  showEditButton,
  ...args
}) => {
  const [value, setValue] = useState(args.value);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
    <HeaderProjectSelector
      {...args}
      onCreate={showCreateButton ? args.onCreate : undefined}
      onEdit={showEditButton ? args.onEdit : undefined}
      onChange={setValue}
      value={value}
    />
  );
};

export const projects = Template.bind({});
projects.args = {
  showCreateButton: true,
  showEditButton: true,
  value: 'short-0',
  items: [
    { label: 'Zialactic', value: 'short-0', editable: true },
    { label: 'Zaggles', value: 'short-1', editable: true },
    { label: 'Isologia', value: 'short-2', editable: true },
    { label: 'Undertap', value: 'short-3', editable: true },
    { label: 'Gluid', value: 'short-4', editable: true },
    { label: 'Insource', value: 'short-5', editable: true },
    { label: 'Mantrix', value: 'short-6', editable: true },
    { label: 'Datagen', value: 'short-7', editable: true },
    { label: 'Isologics', value: 'short-8', editable: true },
    { label: 'Zork', value: 'short-9', editable: true },
    { label: 'Paragonia Waretel Ozean Tropolis Isologix Datagen Rooforia Concility', value: 'long-0', editable: true },
    { label: 'Ovium', value: 'short-11', editable: true },
    { label: 'Rooforia', value: 'short-12', editable: true },
    { label: 'Tellifly', value: 'short-13', editable: true },
    { label: 'Rocklogic', value: 'short-14', editable: true },
  ],
};

export const projectsWithCatalogs = Template.bind({});
projectsWithCatalogs.args = {
  showCreateButton: true,
  showEditButton: true,
  value: 'short-0',
  items: [
    {
      label: 'Zensus',
      projects: [
        { label: 'Zialactic', value: 'short-0', editable: true },
        { label: 'Zaggles', value: 'short-1', editable: true },
        { label: 'Isologia', value: 'short-2', editable: true },
        { label: 'Undertap', value: 'short-3', editable: true },
        { label: 'Gluid', value: 'short-4', editable: true },
      ],
    },
    {
      label: 'Chillium',
      projects: [
        { label: 'Insource', value: 'short-5', editable: true },
        { label: 'Mantrix', value: 'short-6', editable: true },
        { label: 'Datagen', value: 'short-7', editable: true },
        { label: 'Isologics', value: 'short-8', editable: true },
        { label: 'Zork', value: 'short-9', editable: true },
      ],
    },
    {
      label: 'Unia',
      projects: [
        {
          label: 'Paragonia Waretel Ozean Tropolis Isologix Datagen Rooforia Concility',
          value: 'long-0',
          editable: true,
        },
        { label: 'Ovium', value: 'short-11', editable: true },
        { label: 'Rooforia', value: 'short-12', editable: true },
        { label: 'Tellifly', value: 'short-13', editable: true },
        { label: 'Rocklogic', value: 'short-14', editable: true },
      ],
    },
  ],
};

export const projectsWithWorkspaces = Template.bind({});
projectsWithWorkspaces.args = {
  showCreateButton: true,
  showEditButton: true,
  value: 'short-0',
  items: [
    {
      label: 'Zensus',
      workspaces: [
        { label: 'Zialactic', value: 'short-0', editable: true },
        { label: 'Zaggles', value: 'short-1', editable: true },
        { label: 'Isologia', value: 'short-2', editable: true },
        { label: 'Undertap', value: 'short-3', editable: true },
        { label: 'Gluid', value: 'short-4', editable: true },
      ],
    },
    {
      label: 'Chillium',
      workspaces: [
        { label: 'Insource', value: 'short-5', editable: true },
        { label: 'Mantrix', value: 'short-6', editable: true },
        { label: 'Datagen', value: 'short-7', editable: true },
        { label: 'Isologics', value: 'short-8', editable: true },
        { label: 'Zork', value: 'short-9', editable: true },
      ],
    },
    {
      label: 'Unia',
      workspaces: [
        {
          label: 'Paragonia Waretel Ozean Tropolis Isologix Datagen Rooforia Concility',
          value: 'long-0',
          editable: true,
        },
        { label: 'Ovium', value: 'short-11', editable: true },
        { label: 'Rooforia', value: 'short-12', editable: true },
        { label: 'Tellifly', value: 'short-13', editable: true },
        { label: 'Rocklogic', value: 'short-14', editable: true },
      ],
    },
  ],
};
