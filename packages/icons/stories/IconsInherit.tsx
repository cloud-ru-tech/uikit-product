import { styled } from '@linaria/react';
import * as Icons from '@sbercloud/icons/build/icons';
import { Button } from '@sbercloud/uikit-react-button';
import { Input } from '@sbercloud/uikit-react-input';
import { Text2 } from '@sbercloud/uikit-typography';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';

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
            <Icons.CrossSVG
              onClick={(): void => {
                setSearch('');
              }}
            />
          ) : (
            <Icons.SearchSVG />
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

export const inheritColor = Template.bind({});

inheritColor.args = {};
inheritColor.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
inheritColor.argTypes = {};

export default {
  title: 'Not stable/Icons/Inherit Color',
  component: Group,
  decorators: [addReadme, withDesign],
} as Meta;
