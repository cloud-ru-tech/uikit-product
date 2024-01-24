import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { CardBanner, CardService, CardServiceSmall } from '@sbercloud/uikit-product-card-predefined';
import { DockerRegistryDisplaySVG, UserInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Carousel, CarouselProps } from '../src';

const meta: Meta = {
  title: 'Not stable/Carousel',
  component: Carousel,
};
export default meta;

const StoryWrap = styled.div``;

const CardsWrap = styled.div`
  display: flex;
  gap: 20px;
`;

const cardClassName = css`
  width: 100%;
`;

const CardWideWrapper = styled.div`
  height: 332px;
  width: 100%;
`;

const cardsMock = [
  <CardsWrap key={1}>
    <CardServiceSmall
      emblem={{
        icon: DockerRegistryDisplaySVG,
      }}
      title={'Заголовок'}
      className={cardClassName}
    />
    <CardServiceSmall
      emblem={{
        icon: DockerRegistryDisplaySVG,
      }}
      title={'Заголовок'}
      className={cardClassName}
    />
    <CardServiceSmall
      emblem={{
        icon: DockerRegistryDisplaySVG,
      }}
      title={'Заголовок'}
      className={cardClassName}
    />
  </CardsWrap>,
  <CardsWrap key={2}>
    <CardService
      emblem={{
        icon: DockerRegistryDisplaySVG,
      }}
      title={'Заголовок'}
      description={'Описание в 1 строку'}
      actionLabel={'Кнопка'}
      className={cardClassName}
    />
    <CardService
      emblem={{
        icon: UserInterfaceSVG,
      }}
      title={'Заголовок'}
      description={'Описание в 1 строку'}
      actionLabel={'Кнопка'}
      className={cardClassName}
    />
  </CardsWrap>,
  <CardsWrap key={3}>
    <CardWideWrapper>
      <CardBanner
        title={'Заголовок'}
        description={'Описание для карточки'}
        actionLabel={'Открыть'}
        emblem={{
          icon: UserInterfaceSVG,
        }}
        image={{
          src: 'https://images.unsplash.com/photo-1655720031554-a929595ffad7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
          alt: '',
        }}
        className={cardClassName}
      />
    </CardWideWrapper>
  </CardsWrap>,
];

function Template({ ...args }: CarouselProps) {
  return (
    <StoryWrap>
      <Carousel
        {...args}
        items={cardsMock}
        nextButtonTooltips={{ tooltipContent: 'next', disabledTooltipContent: 'disabled' }}
        prevButtonTooltips={{ tooltipContent: 'prev', disabledTooltipContent: 'disabled' }}
      />
    </StoryWrap>
  );
}

export const carousel: StoryFn<CarouselProps> = Template.bind({});
carousel.args = {};
carousel.argTypes = {
  carouselTitle: {
    control: {
      type: 'text',
    },
  },
};
carousel.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
  badges: [BADGE.BETA],
};
