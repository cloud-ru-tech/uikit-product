import { useArgs } from '@storybook/preview-api';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect, useRef } from 'react';

import { PlaceholderSVG } from '@sbercloud/uikit-product-icons';
import { ButtonFunction } from '@snack-uikit/button';
import { toaster } from '@snack-uikit/toaster';
import { extractSupportProps } from '@snack-uikit/utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MobileToolbar, MobileToolbarProps } from '../src';
import { FilterRow } from '../src/components/MobileToolbar/types';
import { BULK_ACTIONS, FILTER_ROW, OPTIONS } from './constants';
import { TEST_ID_TOASTER } from './testIds';

const meta: Meta = {
  title: 'Mobile/Toolbar',
  component: MobileToolbar,
};

export default meta;

type StoryProps = MobileToolbarProps & {
  showSearch: boolean;
  showOnRefresh: boolean;
  showBulkActions: boolean;
  showFilters: boolean;
  filterRowOpened: boolean;
  showManyBulkActions: boolean;
  showAfterActions: boolean;
  showMoreActions: boolean;
  enablePersist: boolean;
};

const Template: StoryFn<StoryProps> = ({
  showOnRefresh,
  showBulkActions,
  showManyBulkActions,
  showFilters,
  filterRowOpened,
  showAfterActions,
  showSearch,
  showMoreActions,
  outline,
  selectionMode,
  enablePersist,
  ...args
}: StoryProps) => {
  const bulkActions = showManyBulkActions ? args.bulkActions : args.bulkActions?.slice(0, 3);
  const [{ search, checked, filterRow: filterRowArg, indeterminate }, updateArgs] = useArgs<StoryProps>();

  const filterRowRef = useRef<FilterRow<Record<string, unknown>>>(filterRowArg ?? FILTER_ROW);
  const filterRow = filterRowRef.current ?? {};

  const onSearchChange = (value: string) => {
    updateArgs({ search: { ...search, value, onChange() {} } });
  };

  const onVisibleFiltersChange = (value: string[]) => {
    filterRowRef.current = {
      ...filterRowRef.current,
      visibleFilters: value,
    };

    updateArgs({
      filterRow: {
        ...filterRowArg,
        filters: filterRowArg?.filters ?? [],
        value: filterRowRef.current.value,
        visibleFilters: filterRowRef.current.visibleFilters,
      },
    });
  };

  const onFiltersChange = (state: Record<string, unknown>) => {
    const filtersWithValues = Object.entries(state).reduce((acc: Record<string, unknown>, [key, value]) => {
      if (value) {
        acc[key] = value;
      }
      return acc;
    }, {});

    const visibleFilters = Object.keys(filtersWithValues);

    filterRowRef.current = {
      ...filterRowRef.current,
      value: filtersWithValues,
      visibleFilters,
    };

    updateArgs({
      filterRow: {
        ...filterRowArg,
        filters: filterRowArg?.filters ?? [],
        value: filtersWithValues,
        visibleFilters,
      },
    });
  };

  const toggleChecked = () => {
    updateArgs({ checked: !checked });
  };

  useEffect(() => {
    const setIndeterminate = (value: boolean) => {
      updateArgs({ indeterminate: value });
    };

    checked && setIndeterminate(false);
  }, [checked, updateArgs]);

  const onRefresh = () => toaster.userAction.neutral({ label: 'Refresh', 'data-test-id': TEST_ID_TOASTER.refresh });
  const onSubmit = () => toaster.userAction.success({ label: 'Submit', 'data-test-id': TEST_ID_TOASTER.submit });

  const afterActions = (
    <>
      <ButtonFunction icon={<PlaceholderSVG />} size='m' />
      <ButtonFunction icon={<PlaceholderSVG />} size='m' />
    </>
  );

  return (
    <MobileToolbar
      {...extractSupportProps(args)}
      outline={outline}
      selectionMode={selectionMode}
      {...(selectionMode === 'multiple'
        ? {
            checked,
            onCheck: toggleChecked,
            bulkActions: showBulkActions ? bulkActions : undefined,
            indeterminate,
            selectedCount: 5,
          }
        : {})}
      search={
        showSearch && search
          ? {
              ...search,
              onChange: onSearchChange,
              onSubmit,
            }
          : undefined
      }
      onRefresh={showOnRefresh ? onRefresh : undefined}
      after={showAfterActions ? afterActions : undefined}
      moreActions={showMoreActions ? OPTIONS : undefined}
      filterRow={
        showFilters && filterRow
          ? {
              ...filterRow,
              open: filterRowOpened,
              onChange: onFiltersChange,
              onVisibleFiltersChange,
            }
          : undefined
      }
      persist={
        enablePersist
          ? {
              id: 'toolbar_filters_story',
              filterQueryKey: 'filters',
              onLoad: ({ filter, search: searchValue }) => {
                const filterValue = filter || {};
                onFiltersChange(filterValue);
                onSearchChange(searchValue || '');
              },
            }
          : undefined
      }
    />
  );
};

export const toolbar: StoryObj<StoryProps> = {
  render: Template,

  args: {
    outline: false,
    selectionMode: 'multiple',
    checked: false,
    indeterminate: false,
    showBulkActions: true,
    showManyBulkActions: true,
    bulkActions: BULK_ACTIONS,
    showSearch: true,
    search: {
      value: '',
      placeholder: 'Search',
      loading: false,
      onChange() {},
    },
    showFilters: true,
    filterRow: FILTER_ROW,
    filterRowOpened: undefined,
    showMoreActions: true,
    moreActions: OPTIONS,
    showOnRefresh: true,
    showAfterActions: true,
    enablePersist: false,
    'data-test-id': 'toolbar',
  },

  argTypes: {
    checked: {
      if: {
        arg: 'selectionMode',
        eq: 'multiple',
      },
    },
    indeterminate: {
      if: {
        arg: 'selectionMode',
        eq: 'multiple',
      },
    },
    showBulkActions: {
      name: '[Story]: Show bulk actions',
      type: 'boolean',
    },
    showManyBulkActions: {
      name: '[Story]: Show many bulk actions to display droplist',
      type: 'boolean',
      if: {
        arg: 'showBulkActions',
        eq: true,
      },
    },
    bulkActions: {
      if: {
        arg: 'showBulkActions',
        eq: true,
      },
    },
    showFilters: {
      name: '[Story]: Show filters',
      type: 'boolean',
    },
    filterRowOpened: {
      name: '[Story]: Filter row open',
      type: 'boolean',
      if: {
        arg: 'showFilters',
        eq: true,
      },
    },
    filterRow: {
      if: {
        arg: 'showFilters',
        eq: true,
      },
    },
    showOnRefresh: {
      name: '[Story]: Apply onRefresh callback',
      type: 'boolean',
    },
    showSearch: {
      name: '[Story]: Apply search props',
      type: 'boolean',
    },
    search: {
      if: {
        arg: 'showSearch',
        eq: true,
      },
    },
    showAfterActions: {
      name: '[Story]: Show custom ReactNode "after" (on the right side)',
      type: 'boolean',
    },
    showMoreActions: {
      name: '[Story]: Show moreActions',
      type: 'boolean',
    },
    enablePersist: {
      name: '[Story]: Enable filters persist',
      type: 'boolean',
    },
    persist: {
      if: {
        arg: 'enablePersist',
        eq: true,
      },
    },

    moreActions: {
      if: {
        arg: 'showMoreActions',
        eq: true,
      },
    },
    after: { table: { disable: true } },
    onCheck: { table: { disable: true } },
    onRefresh: { table: { disable: true } },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A224846&mode=design',
    },
  },
};
