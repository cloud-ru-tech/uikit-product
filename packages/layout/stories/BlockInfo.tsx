import { Meta, StoryFn } from '@storybook/react';

import { InputCommon } from '@sbercloud/uikit-product-input';
import { TextField } from '@sbercloud/uikit-product-text-field';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { BlockInfo, InfoBlockProps, LabelInfo } from '../src';

export default {
  title: 'Not stable/Layout/BlockInfo/BlockInfo',
  component: BlockInfo,
} as Meta;

const Template: StoryFn<InfoBlockProps> = ({ ...args }) => <BlockInfo {...args} />;

export const blockInfo = Template.bind({});

blockInfo.args = {
  groups: [
    {
      title: 'Общие параметры',
      items: [
        {
          label: <LabelInfo size={LabelInfo.sizes.Large} label='Название' />,
          value: <TextField size={TextField.sizes.Large} text='Space' allowCopy />,
        },
        {
          label: <LabelInfo size={LabelInfo.sizes.Large} label='Описание' />,
          value: <InputCommon size={InputCommon.sizes.Large} value={'Some text'} onChange={() => {}} />,
        },
      ],
    },
    {
      title: <LabelInfo label='Конфигурация' tooltip={{ content: 'Конфигурация' }} />,
      items: [
        {
          label: <LabelInfo label='Название конфигурации' tooltip={{ content: 'Название конфигурации' }} />,
          value: 'Small',
        },
        {
          label: <LabelInfo label='vCPU' />,
          value: '0.1 vCPU – 128 MB',
        },
        {
          label: <LabelInfo label='URI образа' size={LabelInfo.sizes.Large} />,
          value: (
            <TextField
              text='docker.dev.cr.sbercloud.dev/a45f5052-f693-411f-b43e-61770b147181a45f5052-f693-411f-b43e-61770b147181'
              type={TextField.types.MultiLine}
            />
          ),
        },
      ],
    },
  ],
  title: 'Информация',
  buttonText: 'Сохранить изменения',
  showButton: true,
};

blockInfo.argTypes = {};

blockInfo.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/cdtItYHTIEGB0wMZPAp729/%5BLIB%5D-Platform-DS-%E2%88%99-Sandbox?type=design&node-id=1326-174807&t=eN8anAcYgN7ZSBEQ-0',
  },
};
