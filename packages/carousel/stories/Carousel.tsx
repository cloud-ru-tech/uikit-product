import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Card } from '@sbercloud/uikit-react-cards';
import { H3 } from '@sbercloud/uikit-typography';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Carousel, CarouselProps } from '../src';

export default {
  title: 'Not stable/Carousel',
  component: Carousel,
} as Meta;

const CardContentWrapStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300px;
  justify-content: space-between;
`;

const StoryWrap = styled.div``;
const CardsWrap = styled.div`
  display: flex;
  height: 350px;
`;

const CardContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300px;
  justify-content: center;
`;

const cardClassname = css`
  margin: 0 6px 18px 6px;
`;

const cardsMock = [
  <CardsWrap key={1}>
    <Card className={cardClassname}>
      <CardContentWrapStyled>
        <CardContentStyled>
          <H3>Example 1</H3>
        </CardContentStyled>
      </CardContentWrapStyled>
    </Card>
    <Card className={cardClassname}>
      <CardContentWrapStyled>
        <CardContentStyled>
          <H3>Example 2</H3>
        </CardContentStyled>
      </CardContentWrapStyled>
    </Card>
    <Card className={cardClassname}>
      <CardContentWrapStyled>
        <CardContentStyled>
          <H3>Example 3</H3>
        </CardContentStyled>
      </CardContentWrapStyled>
    </Card>
  </CardsWrap>,
  <CardsWrap key={2}>
    <Card className={cardClassname}>
      <CardContentWrapStyled>
        <CardContentStyled>
          <H3>Example 4</H3>
        </CardContentStyled>
      </CardContentWrapStyled>
    </Card>
    <Card className={cardClassname}>
      <CardContentWrapStyled>
        <CardContentStyled>
          <H3>Example 5</H3>
        </CardContentStyled>
      </CardContentWrapStyled>
    </Card>
  </CardsWrap>,
  <CardsWrap key={3}>
    <Card className={cardClassname}>
      <CardContentWrapStyled>
        <CardContentStyled>
          <H3>Example 7</H3>
        </CardContentStyled>
      </CardContentWrapStyled>
    </Card>
  </CardsWrap>,
];

const Template: Story<CarouselProps> = ({ ...args }) => (
  <StoryWrap>
    <Carousel
      {...args}
      items={cardsMock}
      nextButtonTooltips={{ tooltipContent: 'next', disabledTooltipContent: 'disabled' }}
      prevButtonTooltips={{ tooltipContent: 'prev', disabledTooltipContent: 'disabled' }}
    />
  </StoryWrap>
);

export const carousel = Template.bind({});
carousel.args = {};
carousel.argTypes = {
  title: {
    control: {
      type: 'text',
    },
  },
};
carousel.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
  badges: [BADGE.BETA],
};
