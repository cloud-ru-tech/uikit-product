import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Pagination, PaginationProps } from '../src';

export default {
  title: 'Components/Pagination/Pagination',
  component: Pagination,
} as Meta;

const Template: StoryFn<PaginationProps> = args => {
  const [page, setPage] = useState(args.page);

  useEffect(() => {
    setPage(args.page);
  }, [args.page]);

  return <Pagination {...args} page={page} onChange={setPage} />;
};

export const pagination = Template.bind({});
pagination.args = { total: 10, page: 1 };
pagination.argTypes = {};
pagination.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE, BADGE.PRIVATE],
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=555%3A0',
  },
};
