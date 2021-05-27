import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { CrossSVG, SearchSVG } from '@sbercloud/icons';
import * as Icons from '@sbercloud/icons/build/icons-color';
import { Input } from '@sbercloud/uikit-react-input';
import { Text2 } from '@sbercloud/uikit-typography';

const Group = styled.div`
  margin-top: 24px;

  height: calc(100vh - 90px);
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
`;

const Item = styled.div`
  margin: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 80px;
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
            <CrossSVG
              onClick={(): void => {
                setSearch('');
              }}
            />
          ) : (
            <SearchSVG />
          )
        }
        placeholder='Поиск'
      />
      <Group>
        {Object.entries(Icons)
          .filter(([key]) => key.toLowerCase().includes(search))
          .map(([key, Icon]) => (
            <Item key={key}>
              <Icon />
              <div>
                <Text2>{key}</Text2>
              </div>
            </Item>
          ))}
      </Group>
    </>
  );
};

export const color = Template.bind({});

color.args = {};

color.argTypes = {};

export default {
  title: 'Components/Icons/Color',
  component: Group,
} as Meta;
