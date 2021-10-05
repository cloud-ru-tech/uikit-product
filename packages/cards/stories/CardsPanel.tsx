import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { CopyInput } from '@sbercloud/uikit-react-input';
import { Tag } from '@sbercloud/uikit-react-tag';

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

const data = [{}, { selected: true }, { selected: true }, {}, {}, { selected: true }, {}, { selected: true }];

interface IStoryProps extends CardsPanelProps {
  usePagination?: boolean;
}

const Template: Story<IStoryProps> = ({ ...args }) => (
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
    {data.map(({ selected }, index) => (
      <CardsPanelItem selected={selected} key={index} onClick={() => alert('alert')}>
        <TagsWrapStyled>{selected ? <Tag color='red'>Selected</Tag> : null}</TagsWrapStyled>
        <TitleStyled>{`Сontainer-registry-${index}`}</TitleStyled>
        <DateStyled>{new Date('2020-10-26T00:09:27.249000').toLocaleDateString()}</DateStyled>
        <InputWrapStyled>
          <CopyInput label='Image' labelMinWidth='80px' value='qwewerwerwerwer' />
        </InputWrapStyled>
        <InputWrapStyled>
          <CopyInput label='URL' labelMinWidth='80px' value='sdmncv,mshfwld' />
        </InputWrapStyled>
      </CardsPanelItem>
    ))}
  </CardsPanel>
);

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
};
