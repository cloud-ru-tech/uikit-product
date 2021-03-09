import React, { useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';

import { Select } from 'components/Select';
import { Button } from 'components/Button';
import { Divider } from 'components/Divider';
import { PRESET_COLORS } from 'components/Tag/helpers/colors';
import getRandomInt from 'components/Select/helpers/getRandomInt';

import { OptionTypeTag, TagSelect } from './TagSelect';

export default {
  title: 'Example/Select',
  component: Select,
  decorators: [withDesign],
} as Meta;

const tags = [...new Array(100)].map(() => ({
  value: Math.random().toString(),
  label: `предикт_станок_${getRandomInt(0, 1000)}`,
  color: PRESET_COLORS[getRandomInt(0, PRESET_COLORS.length - 1)],
}));

export const Template = (): JSX.Element => {
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
      <div style={{ width: 200 }}>
        <TagSelect
          options={stateTags}
          defaultValue={stateTags[0]}
          isHover={isHover}
          onTagChange={(tags): void => {
            setTags(tags);
          }}
          onChange={(tag: OptionTypeTag): void => {
            console.log('tag: ', tag);
          }}
        />
        <Divider />
        <TagSelect
          customControl={({ toggleMenu, menuIsOpen }): JSX.Element => (
            <Button
              theme={'rounded'}
              onClick={(): void => toggleMenu()}
              active={menuIsOpen}
            >
              Добавить тег
            </Button>
          )}
          isSelected={false}
          options={stateTags}
          onTagChange={(changedTags): void => {
            setTags(changedTags);
          }}
        />
      </div>
    </div>
  );
};

Template.parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/9UAhwzTGUnOFaczS5Q5v5c/SberCloud-%E2%86%92-WHITE_Design_System?node-id=7%3A19911',
  },
};
