import { Tag } from '@sbercloud/uikit-product-tag';

import { FilterRow, FilterRowProps } from '../src';

export const filtersMock: FilterRowProps['filters'] = [
  {
    type: FilterRow.filterTypes.Select,
    id: 'vms',
    label: 'Виртуальные машины',
    items: [
      { value: 'vm-1', label: 'Vm-1' },
      { value: 'vm-2', label: 'Vm-2' },
      { value: 'vm-3', label: 'Vm-3' },
    ],
    withSearch: true,
  },

  {
    type: FilterRow.filterTypes.Select,
    id: 'images',
    label: 'Образы',
    items: [
      { value: 'ubuntu', label: 'Ubuntu 22', header: 'Операционные системы' },
      { value: 'cirros', label: 'Cirros' },
      { value: 'centos', label: 'CentOs' },
      { value: 'sus', label: 'Some-user-snapshot', header: 'Пользовательский образ' },
      { value: 'sus-2', label: 'Some-user-snapshot-2' },
    ],
    withSearch: true,
    withSelectAll: true,
  },

  {
    type: FilterRow.filterTypes.Radio,
    id: 'ip',
    label: 'Внешний IP',
    items: [
      { value: true, label: 'Подключен' },
      { value: false, label: 'Отсутствует' },
    ],
  },

  {
    type: FilterRow.filterTypes.Select,
    id: 'tags',
    label: 'Тэги',
    items: [
      {
        value: 'test',
        label: <Tag value='Test tag' color={Tag.colors.Gray} />,
        valueToFilter: 'test tag',
      },
      {
        value: 'red',
        label: <Tag value='Red tag' color={Tag.colors.Red} />,
        valueToFilter: 'red tag',
      },
      {
        value: 'green very long',
        label: <Tag value='Green very long' color={Tag.colors.Green} />,
        valueToFilter: 'green very long',
      },
    ],
    withSearch: true,
  },
];
