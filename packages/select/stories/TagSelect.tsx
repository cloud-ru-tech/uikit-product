import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { Button } from '@sbercloud/uikit-react-button';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TagSelect } from '../src';
import { PRESET_COLORS } from '../src/constants';
import getRandomInt from '../src/helpers/getRandomInt';

export default {
  title: 'Not stable/Select/Tag Select',
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

const Template: Story = (args): JSX.Element => {
  const [isHover, setHover] = useState(false);
  const [stateTags, setTags] = useState([
    {
      value: Math.random().toString(),
      label: 'test-tag',
      color: PRESET_COLORS[getRandomInt(0, PRESET_COLORS.length - 1)],
    },
    ...tags,
  ]);

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
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
          {...args}
        />
        <TagSelect
          customControl={({ toggleMenu }): JSX.Element => (
            <Button onClick={(): void => toggleMenu()} text='Добавить тег' />
          )}
          isSelected={false}
          options={stateTags}
          onTagChange={(changedTags): void => {
            setTags(changedTags);
          }}
          {...args}
        />
      </Wrap>
    </div>
  );
};

export const tagSelect = Template.bind({});
tagSelect.args = {
  validator: (tagName: string) => tagName.length <= 16 && /^[A-Za-z0-9_.-]+$/.test(tagName),
  validateMessage:
    'Можно использовать строчные буквы латинского алфавита (a-z); цифры (0-9); символ тире (-). Начинаться обязательно должно с буквы, заканчиваться может буквой или цифрой, максимум 16 символов. Например: test-1',
};
tagSelect.argTypes = {};
tagSelect.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
