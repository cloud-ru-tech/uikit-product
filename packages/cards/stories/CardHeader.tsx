import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { H3 } from '@sbercloud/uikit-typography';

import { Card, CardHeader, CardHeaderProps } from '../src';

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

const Template: Story<CardHeaderProps> = ({ ...args }) => {
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
