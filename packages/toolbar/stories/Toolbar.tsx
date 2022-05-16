import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { TFilterValueType } from '@sbercloud/uikit-product-filter';
import { DeleteInterfaceSVG, RowExpandedInterfaceSVG, TableSettingsInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { WithSupportProps } from '@sbercloud/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Toolbar } from '../src';
import { defOpt, defValue } from './helpers/mockData';

export default {
  title: 'Not stable/Toolbar',
  component: Toolbar.Container,
} as Meta;

const Template: Story<WithSupportProps<Toolbar.ContainerProps>> = ({ ...args }) => {
  const [value, setValue] = useState<string>('');
  const [filterValue, setFilterValue] = useState<TFilterValueType[] | string>(defValue);

  return (
    <Toolbar.Container {...args}>
      <Toolbar.Refresh />
      <Toolbar.Button disabled tooltip={{ content: 'Удалить' }} icon={<DeleteInterfaceSVG />} />
      <Toolbar.Input
        placeholder={'Поиск'}
        value={value}
        onChange={(value: string): void => {
          setValue(value);
        }}
      />
      <Toolbar.Button tooltip={{ content: 'Раскрыть' }} icon={<RowExpandedInterfaceSVG />} />

      <Toolbar.Button isActive tooltip={{ content: 'Настройки' }} icon={<TableSettingsInterfaceSVG />} />
      <Toolbar.Filter
        filterOptions={defOpt}
        value={filterValue}
        onChange={(val, queryString) => {
          setFilterValue(queryString);
        }}
      />
      <Toolbar.Divider />
      <Toolbar.MoreActions
        actions={[{ name: 'Экспортировать в csv', onClick: () => {} }]}
        tooltip={{ content: 'Export' }}
      />
    </Toolbar.Container>
  );
};

export const toolbar = Template.bind({});
toolbar.args = {};
toolbar.argTypes = {
  'data-test-id': {
    control: {
      type: 'text',
    },
  },
};
toolbar.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
