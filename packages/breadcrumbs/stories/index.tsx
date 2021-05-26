import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { Button, CopyButton } from '@sbercloud/uikit-react-button';
import { Divider } from '@sbercloud/uikit-react-divider';

import { Breadcrumbs, BreadcrumbsProps } from '../src';
import { docker, fm, items, longItems, longSingle, longTwice } from '../src/helpers/mockData';
import { BreadcrumbItem } from '../src/helpers/types';

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
} as Meta;

const Template: Story<BreadcrumbsProps> = ({ ...args }) => {
  const [data, setData] = useState<BreadcrumbItem[]>([]);
  return (
    <>
      <Breadcrumbs {...args} items={items} />
      <Breadcrumbs {...args} items={longItems}>
        <CopyButton />
      </Breadcrumbs>
      <Divider />
      <Breadcrumbs {...args} items={longSingle} />
      <Divider />
      <Breadcrumbs items={longTwice}>
        <CopyButton text='link' />
      </Breadcrumbs>
      <Divider />
      <Breadcrumbs {...args} items={docker} />
      <Divider color='dark' />
      <Breadcrumbs {...args} items={data}>
        <CopyButton />
      </Breadcrumbs>
      <Button onClick={() => setData(fm)}>Set data</Button>
    </>
  );
};

export const breadcrumbs = Template.bind({});
breadcrumbs.args = {};
breadcrumbs.parameters = {};
