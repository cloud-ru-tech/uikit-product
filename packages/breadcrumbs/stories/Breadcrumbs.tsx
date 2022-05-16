import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { Button, ButtonIcon, CopyButton } from '@sbercloud/uikit-product-button';
import { Divider } from '@sbercloud/uikit-product-divider';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Breadcrumbs, BreadcrumbsProps } from '../src';
import { BreadcrumbItem } from '../src/helpers/types';
import { docker, fm, items, longItems, longSingle, longTwice } from './helpers/mockData';

export default {
  title: 'Not stable/Breadcrumbs',
  component: Breadcrumbs,
} as Meta;

const Template: Story<BreadcrumbsProps> = ({ ...args }) => {
  const [data, setData] = useState<BreadcrumbItem[]>([]);
  return (
    <>
      <Breadcrumbs {...args} items={items} />
      <Breadcrumbs {...args} items={longItems}>
        <CopyButton text='test' as={ButtonIcon} variant={ButtonIcon.variants.Color} />
      </Breadcrumbs>
      <Divider />
      <Breadcrumbs {...args} items={longSingle} />
      <Divider />
      <Breadcrumbs items={longTwice}>
        <CopyButton text='link' as={ButtonIcon} variant={ButtonIcon.variants.Color} />
      </Breadcrumbs>
      <Divider />
      <Breadcrumbs {...args} items={docker} />
      <Divider variant={Divider.variants.Extra} />
      <Breadcrumbs {...args} items={data}>
        <CopyButton text='test' as={ButtonIcon} variant={ButtonIcon.variants.Color} />
      </Breadcrumbs>
      <Button onClick={() => setData(fm)} text='Set data' />
    </>
  );
};

export const breadcrumbs = Template.bind({});
breadcrumbs.args = {};
breadcrumbs.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
