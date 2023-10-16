import { Meta, StoryFn } from '@storybook/react';
import { PropsWithChildren, useState } from 'react';

import { Button, ButtonIcon, CopyButton } from '@sbercloud/uikit-product-button';
import { Divider } from '@sbercloud/uikit-product-divider';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Breadcrumbs, BreadcrumbsProps } from '../src';
import { BreadcrumbItem } from '../src/helpers/types';
import { docker, fm, items, longItems, longSingle, longTwice } from './helpers/mockData';

const meta: Meta = {
  title: 'Not stable/Breadcrumbs',
  component: Breadcrumbs,
};

export default meta;

function CaseWrapper({ children, title }: PropsWithChildren<{ title: string }>) {
  return (
    <div style={{ marginBottom: 50 }}>
      <h5>{title}</h5>
      {children}
    </div>
  );
}

function Template({ ...args }: BreadcrumbsProps) {
  const [data, setData] = useState<BreadcrumbItem[]>([]);
  return (
    <>
      <CaseWrapper title='простой'>
        <Breadcrumbs {...args} items={items} />
      </CaseWrapper>

      <CaseWrapper title='длинные айтемы + copy кнопка'>
        <Breadcrumbs {...args} items={longItems}>
          <CopyButton text='test' as={ButtonIcon} variant={ButtonIcon.variants.Color} />
        </Breadcrumbs>
        <Divider />
      </CaseWrapper>

      <CaseWrapper title='один длинный айтем'>
        <Breadcrumbs {...args} items={longSingle} />
        <Divider />
      </CaseWrapper>

      <CaseWrapper title='два длинных айтема'>
        <Breadcrumbs {...args} items={longTwice}>
          <CopyButton text='link' as={ButtonIcon} variant={ButtonIcon.variants.Color} />
        </Breadcrumbs>
        <Divider />
      </CaseWrapper>

      <CaseWrapper title='docker'>
        <Breadcrumbs {...args} items={docker} />
        <Divider variant={Divider.variants.Extra} />
      </CaseWrapper>

      <CaseWrapper title={data.length ? 'Данные установлены' : 'Пустой массив, нажмите "Set data" для заполнения'}>
        <Breadcrumbs {...args} items={data}>
          <CopyButton text='test' as={ButtonIcon} variant={ButtonIcon.variants.Color} />
        </Breadcrumbs>
      </CaseWrapper>
      <Button onClick={() => setData(fm)} text='Set data' />
    </>
  );
}

export const breadcrumbs: StoryFn<BreadcrumbsProps> = Template.bind({});
breadcrumbs.args = {};
breadcrumbs.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    type: 'figma',
    name: 'Figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=802%3A0',
  },
};
