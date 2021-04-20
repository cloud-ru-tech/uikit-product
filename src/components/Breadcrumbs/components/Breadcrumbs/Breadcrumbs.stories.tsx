import { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Divider } from 'components/Divider';
import { Button, CopyButton } from 'components/Button';
import { BreadcrumbItem } from 'components/Breadcrumbs/helpers/types';
import {
  items,
  docker,
  longItems,
  longSingle,
  longTwice,
  fm,
} from 'components/Breadcrumbs/helpers/mockData';

import { IBreadcrumbProps, Breadcrumbs } from './Breadcrumbs';

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
} as Meta;

const Template: Story<IBreadcrumbProps> = ({ ...args }) => {
  const [data, setData] = useState<BreadcrumbItem[]>([]);
  return (
    <>
      <Breadcrumbs {...args} items={items} />
      <Divider />
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
