import { useState } from 'react';
import { styled } from '@linaria/react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Tag } from 'components/Tag';
import { Input } from 'components/Input';
import { Paginate } from 'components/Paginate';
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

const StyledTagsWrap = styled.div`
  height: 26px;
`;

const PaginateWrapStyled = styled.div`
  margin-bottom: 20px;
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

interface IStoryProps extends ICardsPanelProps {
  pageCount?: number;
}

const Template: Story<IStoryProps> = ({ ...args }) => {
  const [favourite, setFavourite] = useState(false);
  const [page, setPage] = useState(0);
  const [checkedCards, setCheckedCards] = useState<number[]>([]);

  const cardsPerPage = data.length / (args.pageCount || 1);

  return (
    <div>
      <PaginateWrapStyled>
        <Paginate
          pageCount={args.pageCount}
          initialPage={page}
          onPageChange={({ selected }) => setPage(selected)}
        />
      </PaginateWrapStyled>
      <CardsPanel {...args}>
        {data
          .filter(
            (_card, index) =>
              index >= page * cardsPerPage && index < (page + 1) * cardsPerPage,
          )
          .map(({ additionalHover, selected }, index) => (
            <CardsPanelItem
              isVertical={args.cardsPerRow !== 1}
              additionalHover={additionalHover}
              selected={selected}
              key={index.toString()}
              defaultFavourite={favourite}
              onFavouriteChange={() => {
                setFavourite(!favourite);
              }}
              checked={checkedCards.includes(index)}
              moreActions={[
                { name: 'Удалить', onClick: () => console.log('Удалить') },
              ]}
              onCheckedClick={check => {
                if (check) {
                  setCheckedCards([...checkedCards, index]);
                  return;
                }

                setCheckedCards(
                  checkedCards.filter(cardIndex => cardIndex !== index),
                );
              }}
              onClick={() => console.log('onClick')}
            >
              <StyledTagsWrap>
                {additionalHover ? (
                  <StyledTagWrap>
                    <Tag color='purple'>AdditionalHover</Tag>
                  </StyledTagWrap>
                ) : null}
                {selected ? <Tag color='red'>Selected</Tag> : null}
              </StyledTagsWrap>
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
    </div>
  );
};

export const cardsPanel = Template.bind({});
cardsPanel.args = {};
cardsPanel.parameters = {};
cardsPanel.argTypes = {
  pageCount: {
    control: {
      type: 'number',
    },
  },
};
