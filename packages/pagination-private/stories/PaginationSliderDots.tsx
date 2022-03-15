import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PaginationSliderDots, PaginationSliderDotsProps } from '../src';

export default {
  title: 'Components/Pagination/Pagination Slider Dots',
  component: PaginationSliderDots,
} as Meta;

const Template: Story<PaginationSliderDotsProps> = args => {
  const [page, setPage] = useState(args.page);

  useEffect(() => {
    setPage(args.page);
  }, [args.page]);

  return <PaginationSliderDots {...args} page={page} onChange={setPage} />;
};

export const paginationSliderDots = Template.bind({});
paginationSliderDots.args = { total: 10, page: 1 };
paginationSliderDots.argTypes = {};
paginationSliderDots.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Platform-Design-System?node-id=555%3A0',
  },
};
