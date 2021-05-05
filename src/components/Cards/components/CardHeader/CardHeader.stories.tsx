import { useState } from 'react';
import { styled } from '@linaria/react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Card } from 'components/Cards';
import { H3 } from 'typography/Headers';

import { CardHeader, ICardHeaderProps } from './CardHeader';

export default {
  title: 'Components/Card',
  component: CardHeader,
} as Meta;

const CardContentWrapStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300px;
  justify-content: space-between;
`;

const StoryWrap = styled.div`
  max-width: 270px;
`;

const CardContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300px;
  justify-content: center;
`;

const Template: Story<ICardHeaderProps> = ({ ...args }) => {
  const [checked, setChecked] = useState(false);

  return (
    <StoryWrap>
      Card with header
      <Card isVertical>
        <CardContentWrapStyled>
          <CardHeader
            {...args}
            checked={checked}
            onCheckboxClick={isChecked => {
              setChecked(isChecked);
            }}
            onFavouriteChange={() => {}}
            moreActions={[{ name: 'Удалить', onClick: () => {} }]}
          />
          <CardContentStyled>
            <H3>Example card</H3>
          </CardContentStyled>
        </CardContentWrapStyled>
      </Card>
    </StoryWrap>
  );
};

export const cardHeader = Template.bind({});
cardHeader.args = {};
cardHeader.argTypes = {
  children: {
    control: {
      type: 'text',
    },
  },
};
