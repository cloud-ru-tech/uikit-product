import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { useAdaptiveGetRowActionsColumnDef, useAdaptiveGetStatusColumnDef } from '@cloud-ru/uikit-product-mobile-table';
import { useAdaptive } from '@cloud-ru/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { EntitiesTable } from '../src';
import { columnFilters, getColumnDefinitions, getQueryFn, noop, StoryProps } from './helpers';

const meta: Meta = {
  title: 'Console/Entities Table',
  component: EntitiesTable,
};
export default meta;

const Template: StoryFn<StoryProps> = args => {
  const { layoutType } = useAdaptive();
  const getStatusColumnDef = useAdaptiveGetStatusColumnDef({ layoutType });
  const getRowActionsColumnDef = useAdaptiveGetRowActionsColumnDef({ layoutType });

  return (
    <EntitiesTable
      {...args}
      layoutType={layoutType}
      queryFn={getQueryFn()}
      columnDefinitions={getColumnDefinitions({ getStatusColumnDef, getRowActionsColumnDef })}
    />
  );
};

export const entitiesTable: StoryObj<StoryProps> = {
  render: Template,
  args: {
    id: 'entities-table-storybook',
    defaultLimit: 10,
    defaultOffset: 0,
    defaultSearch: '',
    searchPlaceholder: 'Search entities',
    onQuerySuccess: noop,
    onPaginationOrDataChange: noop,
    columnFilters,
  },
  argTypes: {
    queryFn: {
      control: {
        disable: true,
      },
    },
    queryProps: {
      control: {
        disable: true,
      },
    },
    onQuerySuccess: {
      control: {
        disable: true,
      },
    },
    onPaginationOrDataChange: {
      control: {
        disable: true,
      },
    },
  },
  parameters: {
    controls: {
      expanded: true,
      include: [
        'id',
        'queryProps',
        'columnDefinitions',
        'defaultSearch',
        'defaultOffset',
        'defaultLimit',
        'defaultSort',
        'searchPlaceholder',
        'columnFilters',
      ],
    },
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A225842&mode=design',
    },
  },
};
