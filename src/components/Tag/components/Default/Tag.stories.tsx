import { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { styled } from '@linaria/react';

import { H4 } from 'typography/Headers';
import { PRESET_COLORS } from 'components/Tag/helpers/colors';

import { Tag, TTagProps } from './Tag';

export default {
  title: 'Components/Tag/Default',
  component: Tag,
} as Meta;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const TagWrap = styled.div`
  padding: 10px;
`;

export const Template: Story<TTagProps> = ({ ...args }) => {
  const [tagText, setTagText] = useState('TagText');

  return (
    <Row>
      <Column>
        <H4>Default tags (preset color)</H4>
        {PRESET_COLORS.map(color => (
          <TagWrap key={color}>
            <Tag color={color} {...args}>
              {color}
            </Tag>
          </TagWrap>
        ))}
      </Column>
      <Column>
        <H4>Input tag</H4>
        <Tag
          {...args}
          color={PRESET_COLORS[0]}
          value={tagText}
          tag='input'
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setTagText(e.target.value);
          }}
        />
      </Column>
    </Row>
  );
};

Template.parameters = {};
