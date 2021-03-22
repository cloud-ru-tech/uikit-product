import { useState } from 'react';
import { styled } from '@linaria/react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { CardHeader, ICardHeaderProps } from './CardHeader';

export default {
  title: 'Components/Card',
  component: CardHeader,
} as Meta;

const StyledCardHeaderWrap = styled.div`
  max-width: 200px;
`;

const Template: Story<ICardHeaderProps> = ({ ...args }) => {
  const [checked, setChecked] = useState(false);

  return (
    <StyledCardHeaderWrap>
      <CardHeader
        {...args}
        checked={checked}
        onCheckboxClick={isChecked => {
          setChecked(isChecked);
          console.log({ isChecked });
        }}
        onFavouriteChange={isFavourite => console.log({ isFavourite })}
        moreActions={[
          { name: 'Удалить', onClick: () => console.log('Удалить') },
        ]}
      />
    </StyledCardHeaderWrap>
  );
};

export const cardHeader = Template.bind({});
cardHeader.args = {};
cardHeader.parameters = {};
