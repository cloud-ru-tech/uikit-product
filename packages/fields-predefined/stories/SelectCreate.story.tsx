import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { KeyManagementSVG } from '@sbercloud/uikit-product-icons';
import { useAdaptive } from '@sbercloud/uikit-product-utils';
import { FieldSelectProps } from '@snack-uikit/fields';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SelectCreate, SelectCreateProps } from '../src/components';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Fields Predefined/SelectCreate',
  component: SelectCreate,
};
export default meta;

function Template(args: SelectCreateProps) {
  const [value, setValue] = useState<string | undefined>();
  const [count, setCount] = useState(3);
  const [options, setOptions] = useState<FieldSelectProps['options']>([
    {
      value: 'Ключ 1',
      option: 'Ключ 1',
    },
    {
      value: 'Ключ 2',
      option: 'Ключ 2',
    },
  ]);

  const { layoutType } = useAdaptive();

  return (
    <SelectCreate
      className={styles.createSelectWrapper}
      {...args}
      selectProps={{
        value,
        options,
        onChange: (id: string) => setValue(id),
        label: 'Ключ шифрования',
      }}
      submitHandler={() =>
        new Promise(resolve => {
          const newOption = { option: `Ключ ${count}`, value: `Ключ ${count}` };
          setOptions(prevOptions => [...prevOptions, newOption]);
          setCount(prev => prev + 1);
          resolve(newOption.value);
        })
      }
      createLayoutProps={{ title: 'Создание ключа', content: 'Форма создания', layoutType }}
    />
  );
}

export const selectCreate: StoryObj<SelectCreateProps> = {
  render: Template,
  args: {
    createLayoutType: 'drawer',
    onRefetch: undefined,
    entityName: { single: 'Ключ', plural: 'Ключи' },
    entityIcon: KeyManagementSVG,
    permission: 'canCreate',
  },
  argTypes: {
    createLayoutType: {
      control: { type: 'radio', options: ['modal', 'drawer'] },
    },
    permission: { control: { type: 'radio', options: ['none', 'canRead', 'canCreate'] } },
  },
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/Product-components?node-id=23888-34929&t=pMfZPU3GO08Pci83-4',
    },
  },
};
