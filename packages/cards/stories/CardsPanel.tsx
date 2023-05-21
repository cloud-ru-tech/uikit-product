import { css } from '@linaria/core';
import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import { DockerRegistryDisplaySVG } from '@sbercloud/uikit-product-icons';
import { Toolbar } from '@sbercloud/uikit-product-toolbar';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CardCategory, CardImage, CardResult, CardsPanel, CardsPanelProps } from '../src';

export default {
  title: 'Components/Cards/Panel',
  component: CardsPanel,
} as Meta;

const SearchWrapView = css`
  margin: 20px 0;
`;

const generateData = (length: number) =>
  Array.from({ length }, (_, i) => ({
    name: `${i % 2 ? 'Public' : 'Private'}-Container-${i}`,
    description:
      'С популярными библиотеками и инструментами С популярными библиотеками и инструментами С популярными библиотеками и инструментами С популярными библиотеками и инструментами',
  }));

enum CardEntity {
  CardResult = 'CardResult',
  CardCategory = 'CardCategory',
  CardImage = 'CardImage',
}

type StoryProps = {
  usePagination?: boolean;
  useSearch: boolean;
  cardsAmount: number;
  cardEntity: CardEntity;
} & CardsPanelProps;

const Template: StoryFn<StoryProps> = ({ ...args }) => {
  const [data, setData] = useState(generateData(args.cardsAmount));
  const [filteredData, setFilteredData] = useState(data);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const filteredData = searchValue
      ? data.filter(item => item.name?.toLocaleLowerCase().includes(searchValue.toLowerCase().trim()))
      : data;
    setFilteredData(filteredData);
  }, [searchValue, data]);

  useEffect(() => {
    setData(generateData(args.cardsAmount));
  }, [args.cardsAmount]);

  useEffect(() => {
    setSearchValue('');
  }, [args.useSearch]);

  return (
    <>
      {args.useSearch && (
        <Toolbar.Container className={SearchWrapView}>
          <Toolbar.Input value={searchValue} onChange={setSearchValue} placeholder={'Поиск'} />
        </Toolbar.Container>
      )}
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
        {filteredData.map(({ name, description }, index) => {
          switch (args.cardEntity) {
            case CardEntity.CardResult:
              return <CardResult title={name} description={description} key={index} onClick={() => {}} />;
            case CardEntity.CardImage:
              return (
                <CardImage
                  title={name}
                  description={'Готовые Docker-образы с популярными инструментами для обучения и инференса'}
                  signature={'от ML Space'}
                  onClick={() => {}}
                  key={index}
                  src={
                    'https://images.unsplash.com/photo-1646627927863-19874c27316b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80'
                  }
                />
              );
            case CardEntity.CardCategory:
            default:
              return (
                <CardCategory
                  title={name}
                  description={description}
                  icon={<DockerRegistryDisplaySVG />}
                  variant={CardCategory.variants.Filled}
                  onClick={() => {}}
                  key={index}
                />
              );
          }
        })}
      </CardsPanel>
    </>
  );
};

export const panel = Template.bind({});

panel.args = {
  cardsAmount: 10,
  autoFill: false,
  cardsPerRow: 2,
  usePagination: false,
  cardEntity: CardEntity.CardCategory,
};
panel.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.BETA],
  design: {
    type: 'figma',
    name: 'Figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=632%3A0',
  },
};
panel.argTypes = {
  usePagination: {
    control: {
      type: 'boolean',
    },
  },
  useSearch: {
    name: '[Stories]: Enable Search Toolbar',
    control: {
      type: 'boolean',
    },
  },
  cardsAmount: {
    name: '[Stories]: Amount of cards',
    control: {
      type: 'range',
      min: 1,
      max: 100,
      step: 1,
    },
  },
  cardEntity: {
    name: '[Stories]: Card in Card Panel',
    control: {
      type: 'radio',
      options: Object.values(CardEntity),
    },
  },
};
