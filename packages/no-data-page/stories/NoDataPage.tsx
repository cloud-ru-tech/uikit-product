import { Meta, Story } from '@storybook/react/types-6-0';

import { Button } from '@sbercloud/uikit-product-button';
import { BucketInterfaceSVG, DataTransferServiceSVG } from '@sbercloud/uikit-product-icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { NoDataPage, NoDataPageProps } from '../src';
import { NoDataPageVariants } from '../src/helpers/types';

export default {
  title: 'Not stable/No Data Page',
  component: NoDataPage,
} as Meta;

const icons = {
  BucketSVG: <BucketInterfaceSVG />,
  ServiceDataTransferServiceSVG: <DataTransferServiceSVG />,
};

const Template: Story<{ icon: string | React.ReactElement } & Omit<NoDataPageProps, 'icon'>> = ({ icon, ...rest }) => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <NoDataPage {...rest} icon={icon as React.ReactElement}>
      <p>
        Хранилище ML Space - это восхитительный и полезный инструмент. Мы можем подвести итог, что современные
        технологии, и компьютеры в частности, имеют как положительные, так и отрицательные последствия для жизни людей.
        А для того, чтобы жить в гармонии люди должны найти правильный баланс.
      </p>
      <p>Чтобы сохранить ваши данные в хранилище ML Space, создайте бакет и загрузите в него файлы.</p>
      <p>Подробнее о сервисе читайте в документации</p>
      <Button text='Создать бакет' />
    </NoDataPage>
  </div>
);

export const noDataPage = Template.bind({});
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
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=323%3A6944',
  },
};
