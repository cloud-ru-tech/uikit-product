import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { TFilterValueType } from '@sbercloud/uikit-product-filter';
import { DeleteInterfaceSVG, RowExpandedInterfaceSVG, TableSettingsInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { WithSupportProps } from '@sbercloud/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Toolbar } from '../src';
import { defOpt, defValue } from './helpers/mockData';

const meta: Meta = {
  title: 'Not stable/Toolbar',
  component: Toolbar.Container,
};
export default meta;

type StoryProps = WithSupportProps<Toolbar.ContainerProps>;

function Template({ ...args }: StoryProps) {
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
        actions={[{ value: 'csv-export', label: 'Экспортировать в csv' }]}
        tooltip={{ content: 'Export' }}
      />
    </Toolbar.Container>
  );
}

export const toolbar: StoryFn<StoryProps> = Template.bind({});
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
  packageName: componentPackage.name,
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=6471%3A89335',
  },
};
