import { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { styled } from '@linaria/react';
import * as Icons from '@sbercloud/icons/build/icons';

import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Text2 } from 'typography/Text/index';

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
              <Button variant='transparent'>
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

inheritColor.argTypes = {};

export default {
  title: 'Components/Icons/Inherit Color',
  component: Group,
} as Meta;
