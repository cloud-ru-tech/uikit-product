import { useState } from 'react';
import { styled } from '@linaria/react';
import { Meta } from '@storybook/react/types-6-0';

import { Button } from 'components/Button';
import { PRESET_COLORS } from 'components/Tag/helpers/colors';
import getRandomInt from 'components/Select/helpers/getRandomInt';

import { TagSelect } from './TagSelect';

export default {
  title: 'Components/Select',
  component: TagSelect,
} as Meta;

const tags = [...new Array(100)].map(() => ({
  value: Math.random().toString(),
  label: `предикт_станок_${getRandomInt(0, 1000)}`,
  color: PRESET_COLORS[getRandomInt(0, PRESET_COLORS.length - 1)],
}));

const Wrap = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-around;
`;

const Template = (): JSX.Element => {
  const [isHover, setHover] = useState(false);
  const [stateTags, setTags] = useState(tags);

  return (
    <div
      onMouseOver={(): void => {
        setHover(true);
      }}
      onMouseLeave={(): void => {
        setHover(false);
      }}
    >
      <Wrap>
        <TagSelect
          options={stateTags}
          defaultValue={stateTags[0]}
          isHover={isHover}
          onTagChange={(tags): void => {
            setTags(tags);
          }}
          onChange={() => {}}
        />
        <TagSelect
          customControl={({ toggleMenu }): JSX.Element => (
            <Button onClick={(): void => toggleMenu()}>Добавить тег</Button>
          )}
          isSelected={false}
          options={stateTags}
          onTagChange={(changedTags): void => {
            setTags(changedTags);
          }}
        />
      </Wrap>
    </div>
  );
};

export const tagSelect = Template.bind({});
