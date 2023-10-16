import { Meta, StoryFn } from '@storybook/react';

import { Button } from '@sbercloud/uikit-product-button';
import { BucketInterfaceSVG, DataTransferServiceSVG } from '@sbercloud/uikit-product-icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { NoDataPage, NoDataPageProps } from '../src';
import { NoDataPageVariants } from '../src/helpers/types';

const meta: Meta = {
  title: 'Not stable/No Data Page',
  component: NoDataPage,
};
export default meta;

const icons = {
  BucketSVG: <BucketInterfaceSVG />,
  ServiceDataTransferServiceSVG: <DataTransferServiceSVG />,
};

type StoryProps = { icon: string | React.ReactElement } & Omit<NoDataPageProps, 'icon'>;

function Template({ icon, ...rest }: StoryProps) {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <NoDataPage {...rest} icon={icon as React.ReactElement}>
        <p>
          Хранилище ML Space - это восхитительный и полезный инструмент. Мы можем подвести итог, что современные
          технологии, и компьютеры в частности, имеют как положительные, так и отрицательные последствия для жизни
          людей. А для того, чтобы жить в гармонии люди должны найти правильный баланс.
        </p>
        <p>Чтобы сохранить ваши данные в хранилище ML Space, создайте бакет и загрузите в него файлы.</p>
        <p>Подробнее о сервисе читайте в документации</p>
        <Button text='Создать бакет' />
      </NoDataPage>
    </div>
  );
}

export const noDataPage: StoryFn<StoryProps> = Template.bind({});
noDataPage.args = {
  type: NoDataPageVariants.Large,
  title: 'Создайте ваш первый бакет для хранения объектов',
  icon: 'BucketSVG',
};
noDataPage.argTypes = {
  type: {
    options: [NoDataPageVariants.Large, NoDataPageVariants.Small],
    control: { type: 'radio' },
  },
  icon: {
    options: Object.keys(icons),
    mapping: icons,
    control: { type: 'radio' },
  },
};

noDataPage.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=323%3A6944',
  },
};
