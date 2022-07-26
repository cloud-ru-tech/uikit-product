import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { HierarchyMenu, HierarchyMenuProps } from '../src';

export default {
  title: 'Not stable/Hierarchy Menu',
  component: HierarchyMenu,
} as Meta;

const Wrapper = styled.div`
  height: 70vh;
  width: 70vw;
`;

let firstId = 0;

function menuTreeGenerator(restDepth: number, latitude: number): HierarchyMenuProps['nodes'] {
  return '1'
    .repeat(latitude)
    .split('')
    .map(() => {
      const id = ++firstId;
      return {
        title: `TITLE ${id}`,
        id: `id_${id}`,
        // eslint-disable-next-line no-console
        onNavigateClick: () => console.log(`id_${id}`),
        directChildren: restDepth ? menuTreeGenerator(restDepth - 1, latitude) : undefined,
      };
    });
}

const Template: Story<HierarchyMenuProps & { latitude: number; depth: number }> = ({ latitude, depth, ...args }) => {
  const [nodes, setNodes] = useState(menuTreeGenerator(depth, latitude));
  useEffect(() => setNodes(menuTreeGenerator(depth, latitude)), [depth, latitude]);
  return (
    <Wrapper>
      <HierarchyMenu {...args} nodes={nodes} />
    </Wrapper>
  );
};

export const hierarchyMenu = Template.bind({});
hierarchyMenu.args = {
  latitude: 3,
  depth: 3,
};
hierarchyMenu.argTypes = {
  latitude: {
    name: '[STORY]: tree latitude',
    control: {
      type: 'range',
      min: 1,
      max: 5,
    },
  },
  depth: {
    name: '[STORY]: tree depth',
    control: {
      type: 'range',
      min: 1,
      max: 5,
    },
  },
};
hierarchyMenu.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%5BLIB%5D-Temp-Design-System',
  },
};
