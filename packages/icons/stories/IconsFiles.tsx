import { styled } from '@linaria/react';
import { Button } from '@sbercloud/uikit-react-button';
import { Input } from '@sbercloud/uikit-react-input';
import { Text2 } from '@sbercloud/uikit-typography';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import * as Icons from '../src/components/files-icons';
import { CloseInterfaceSVG, SearchInterfaceSVG } from '../src/components/interface-icons';

const Group = styled.div`
  margin-top: 24px;

  height: calc(100vh - 90px);
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
`;

const Item = styled.div<{ stroke: boolean }>`
  margin: 0.5rem;
  padding: 0.5rem;
  text-align: center;
  width: 150px;
  stroke: ${({ stroke }) => (stroke ? '#000' : 'inherit')};
`;

const Template: Story = () => {
  const [search, setSearch] = useState('');
  return (
    <>
      <Input
        value={search}
        onChange={event => {
          setSearch(event.target.value.toLowerCase());
        }}
        postfix={
          search ? (
            <CloseInterfaceSVG
              onClick={(): void => {
                setSearch('');
              }}
            />
          ) : (
            <SearchInterfaceSVG />
          )
        }
        placeholder='Поиск'
      />
      <Group>
        {Object.entries(Icons)
          .filter(([key]) => key.toLowerCase().includes(search))
          .map(([key, Icon]) => (
            <Item key={key} stroke={key === 'UploadSVG'}>
              <Button variant={Button.variants.Transparent}>
                <Icon />
              </Button>
              <div>
                <Text2>{key}</Text2>
              </div>
            </Item>
          ))}
      </Group>
    </>
  );
};

export const files = Template.bind({});

files.args = {};
files.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/TEMP-DESIGN-SYSTEM?node-id=212%3A350',
  },
};
files.argTypes = {};

export default {
  title: 'Not stable/Icons/Files',
  component: Group,
} as Meta;
