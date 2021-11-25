import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { styled } from '@linaria/react';
import { useEffect, useState } from '@storybook/addons';
import { Meta, Story } from '@storybook/react/types-6-0';

import { CopyInput } from '@sbercloud/uikit-react-input';
import { Tag } from '@sbercloud/uikit-react-tag';
import { Toolbar } from '@sbercloud/uikit-react-toolbar';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Card, CardsPanel, CardsPanelProps } from '../src';

export default {
  title: 'Not stable/Card/Cards Panel',
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
  margin: 10px 0;
`;

const TagsWrapStyled = styled.div`
  height: 26px;
`;

const ContainerStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  text-align: left;
`;

type CardsPanelItemProps = {
  children: React.ReactNode;
  selected?: boolean;
  className?: string;
  onClick?(e: React.MouseEvent<HTMLDivElement>): void;
};

const CardsPanelItem = ({ children, onClick, className, selected }: CardsPanelItemProps) => (
  <Card selected={selected} onClick={onClick} className={className}>
    <ContainerStyled>{children}</ContainerStyled>
  </Card>
);

const generateData = (length: number) =>
  Array.from({ length }, (_, i) => ({
    name: `${i % 2 ? 'Public' : 'Private'}-Container-${i}`,
    selected: Boolean(i % 2),
    date: new Date().toLocaleDateString(),
    image: `image.png`,
    url: 'http://images.com',
  }));

interface IStoryProps extends CardsPanelProps {
  usePagination?: boolean;
  useSearch: boolean;
  cardsAmount: number;
}

const Template: Story<IStoryProps> = ({ ...args }) => {
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
        <Toolbar.Wrapper>
          <Toolbar.Input value={searchValue} onChange={setSearchValue} />
        </Toolbar.Wrapper>
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
        {filteredData.map(({ name, selected, date, image, url }, index) => (
          <CardsPanelItem selected={selected} key={index} onClick={() => alert('alert')}>
            <TagsWrapStyled>{selected ? <Tag color='red'>Selected</Tag> : null}</TagsWrapStyled>
            <TitleStyled>{name}</TitleStyled>
            <DateStyled>{date}</DateStyled>
            <InputWrapStyled>
              <CopyInput label='Image' labelMinWidth='80px' value={image} />
            </InputWrapStyled>
            <InputWrapStyled>
              <CopyInput label='URL' labelMinWidth='80px' value={url} />
            </InputWrapStyled>
          </CardsPanelItem>
        ))}
      </CardsPanel>
    </>
  );
};

export const cardsPanel = Template.bind({});
cardsPanel.args = {};
cardsPanel.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.BETA],
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
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
  useSearch: {
    name: '[Stories]: Enable Seach Toolbar',
    control: {
      type: 'boolean',
    },
  },
  cardsAmount: {
    name: '[Stories]: Amount of cards',
    defaultValue: 10,
    control: {
      type: 'range',
      min: 1,
      max: 100,
      step: 1,
    },
  },
};
