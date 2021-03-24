import { useState, FC } from 'react';
import { styled } from '@linaria/react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Tag } from 'components/Tag';
import { Input } from 'components/Input';
import { Card, CardHeader } from 'components/Cards';

import { CardsPanel, ICardsPanelProps } from './CardsPanel';

export default {
  title: 'Components/Card',
  component: CardsPanel,
} as Meta;

const TitleStyled = styled.h3`
  margin: 0;
  font-size: 20px;
  line-height: 26px;
  font-weight: normal;
`;

const DateStyled = styled.span`
  color: #a0a0a0;
  font-size: 12px;
  line-height: 16px;
`;

const InputWrapStyled = styled.div`
  margin: 10px 0px;
`;

const TagWrapStyled = styled.div`
  display: inline-block;
  margin-right: 5px;
`;

const TagsWrapStyled = styled.div`
  height: 26px;
`;

const ContentStyled = styled.div`
  margin-top: 16px;
`;

const ContainerStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  text-align: left;
`;

interface ICardsPanelItemProps {
  isVertical: boolean;
  selected?: boolean;
  additionalHover?: boolean;
  defaultFavourite?: boolean;
  onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  onFavouriteChange?(isFavourite: boolean): void;
  checked?: boolean;
  onCheckedClick?(check: boolean): void;
  moreActions?: {
    name: string;
    onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  }[];
  className?: string;
}

const CardsPanelItem: FC<ICardsPanelItemProps> = props => {
  const {
    defaultFavourite = false,
    onFavouriteChange,
    children,
    checked,
    onCheckedClick,
    moreActions,
    onClick,
    className,
    additionalHover,
    selected,
    isVertical,
  } = props;

  const handlerCardClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    const target = e.target as HTMLButtonElement;
    if (target?.id !== 'more-button' && onClick) {
      onClick(e);
    }
  };

  return (
    <Card
      isVertical={isVertical}
      additionalHover={additionalHover}
      selected={selected}
      onClick={handlerCardClick}
      className={className}
    >
      <ContainerStyled>
        <CardHeader
          checked={checked}
          moreActions={moreActions}
          onCheckboxClick={onCheckedClick}
          defaultFavourite={defaultFavourite}
          onFavouriteChange={onFavouriteChange}
        />
        <ContentStyled>{children}</ContentStyled>
      </ContainerStyled>
    </Card>
  );
};

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
  usePagination?: boolean;
}

const Template: Story<IStoryProps> = ({ ...args }) => {
  const [favourite, setFavourite] = useState(false);
  const [checkedCards, setCheckedCards] = useState<number[]>([]);

  return (
    <div>
      <CardsPanel
        {...args}
        paginateProps={
          args.usePagination
            ? {
                page: 0,
                pageSize: 3,
                position: 'top',
              }
            : undefined
        }
      >
        {data.map(({ additionalHover, selected }, index) => (
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
            moreActions={[{ name: 'Удалить', onClick: () => {} }]}
            onCheckedClick={check => {
              if (check) {
                setCheckedCards([...checkedCards, index]);
                return;
              }

              setCheckedCards(
                checkedCards.filter(cardIndex => cardIndex !== index),
              );
            }}
            onClick={() => {}}
          >
            <TagsWrapStyled>
              {additionalHover ? (
                <TagWrapStyled>
                  <Tag color='purple'>AdditionalHover</Tag>
                </TagWrapStyled>
              ) : null}
              {selected ? <Tag color='red'>Selected</Tag> : null}
            </TagsWrapStyled>
            <TitleStyled>{`Сontainer-registry-${index}`}</TitleStyled>
            <DateStyled>
              {new Date('2020-10-26T00:09:27.249000').toLocaleDateString()}
            </DateStyled>
            <InputWrapStyled>
              <Input
                disabled
                allowCopy
                label='Image'
                labelMinWidth='40px'
                value='qwewerwerwerwer'
              />
            </InputWrapStyled>
            <InputWrapStyled>
              <Input
                disabled
                allowCopy
                label='URL'
                labelMinWidth='40px'
                value='sdmncv,mshfwld'
              />
            </InputWrapStyled>
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
  usePagination: {
    control: {
      type: 'boolean',
    },
  },
};
