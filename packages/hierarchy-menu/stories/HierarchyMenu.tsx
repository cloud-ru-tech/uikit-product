import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { HierarchyMenu, HierarchyMenuProps } from '../src';

const meta: Meta = {
  title: 'Not stable/Hierarchy Menu',
  component: HierarchyMenu,
};
export default meta;

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

type StoryProps = HierarchyMenuProps & { latitude: number; depth: number };

function Template({ latitude, depth, ...args }: StoryProps) {
  const [nodes, setNodes] = useState(menuTreeGenerator(depth, latitude));
  useEffect(() => setNodes(menuTreeGenerator(depth, latitude)), [depth, latitude]);
  return (
    <Wrapper>
      <HierarchyMenu {...args} nodes={nodes} />
    </Wrapper>
  );
}

export const hierarchyMenu: StoryFn<StoryProps> = Template.bind({});
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
