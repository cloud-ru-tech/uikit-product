import { useState } from 'react';
import { styled } from '@linaria/react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Tag } from 'components/Tag';
import { Input } from 'components/Input';
import { CardsPanelItem } from 'components/Cards/helperComponents/CardsPanelItem';

import { CardsPanel, ICardsPanelProps } from './CardsPanel';

export default {
  title: 'Components/Card',
  component: CardsPanel,
} as Meta;

const StyledTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  line-height: 26px;
  font-weight: normal;
`;

const StyledDate = styled.span`
  color: #a0a0a0;
  font-size: 12px;
  line-height: 16px;
`;

const StyledInputWrap = styled.div`
  margin: 10px 0px;
`;

const StyledTagWrap = styled.div`
  display: inline-block;
  margin-right: 5px;
`;

const data = [
  { additionalHover: true },
  { selected: true },
  { additionalHover: true, selected: true },
  {},
  {},
  { additionalHover: true, selected: true },
  { additionalHover: true },
  { selected: true },
];

const Template: Story<ICardsPanelProps> = ({ ...args }) => {
  const [favourite, setFavourite] = useState(false);

  return (
    <CardsPanel {...args}>
      {data.map(({ additionalHover, selected }, index) => (
        <CardsPanelItem
          isVertical={args.cardsPerRow !== 1}
          additionalHover={additionalHover}
          selected={selected}
          key={index.toString()}
          header={null}
          defaultFavorite={favourite}
          onFavoriteChange={() => {
            setFavourite(!favourite);
          }}
          checked={false}
          moreActions={[
            { name: 'Удалить', onClick: () => console.log('Удалить') },
          ]}
          onCheckedClick={check => console.log(check)}
          onClick={() => console.log('onClick')}
        >
          {additionalHover ? (
            <StyledTagWrap>
              <Tag color='purple'>AdditionalHover</Tag>
            </StyledTagWrap>
          ) : null}
          {selected ? <Tag color='red'>Selected</Tag> : null}
          <StyledTitle>{`Сontainer-registry-${index}`}</StyledTitle>
          <StyledDate>
            {new Date('2020-10-26T00:09:27.249000').toLocaleDateString()}
          </StyledDate>
          <StyledInputWrap>
            <Input
              disabled
              allowCopy
              label='Image'
              labelMinWidth='40px'
              value='qwewerwerwerwer'
            />
          </StyledInputWrap>
          <StyledInputWrap>
            <Input
              disabled
              allowCopy
              label='URL'
              labelMinWidth='40px'
              value='sdmncv,mshfwld'
            />
          </StyledInputWrap>
        </CardsPanelItem>
      ))}
    </CardsPanel>
  );
};

export const cardsPanel = Template.bind({});
cardsPanel.args = {};
cardsPanel.parameters = {};
