import { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { styled } from '@linaria/react';

import { H4 } from 'typography/Headers';
import { PRESET_COLORS } from 'components/Tag/helpers/colors';

import { Tag, ITagProps } from './Tag';

export default {
  title: 'Components/Tag',
  component: Tag,
} as Meta;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 50px;
`;

const TagWrap = styled.div`
  padding: 10px;
`;

const Title = styled(H4)`
  margin-bottom: 20px;
`;

const Template: Story<ITagProps> = ({ ...args }) => {
  const [tagText, setTagText] = useState('TagText');

  return (
    <Row>
      <Column>
        <Title>Default tags (preset color)</Title>
        {PRESET_COLORS.map(color => (
          <TagWrap key={color}>
            <Tag {...args} color={color}>
              {color}
            </Tag>
          </TagWrap>
        ))}
      </Column>
      <Column>
        <Title>Input tag with custom color</Title>
        <Tag
          {...args}
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

export const tag = Template.bind({});
tag.args = { color: 'aqua' };
tag.parameters = {};
