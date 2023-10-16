import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { CardQuickAction, CardTopic, CardWide } from '@sbercloud/uikit-product-cards';
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

const CardWideWrapper = styled.div`
  height: 332px;
  width: 100%;
`;

const cardsMock = [
  <CardsWrap key={1}>
    <CardTopic
      icon={<DockerRegistryDisplaySVG />}
      title={'Заголовок'}
      color={CardTopic.colors.Red}
      onClick={() => {}}
    />
    <CardTopic
      icon={<DockerRegistryDisplaySVG />}
      title={'Заголовок'}
      color={CardTopic.colors.Blue}
      onClick={() => {}}
    />
    <CardTopic
      icon={<DockerRegistryDisplaySVG />}
      title={'Заголовок'}
      color={CardTopic.colors.Green}
      onClick={() => {}}
    />
  </CardsWrap>,
  <CardsWrap key={2}>
    <CardQuickAction
      icon={<DockerRegistryDisplaySVG />}
      title={'Заголовок'}
      description={'Описание в 1 строку'}
      variant={CardQuickAction.variants.Primary}
      onClick={() => {}}
    />
    <CardQuickAction
      icon={<UserInterfaceSVG />}
      title={'Заголовок'}
      description={'Описание в 1 строку'}
      variant={CardQuickAction.variants.Accent}
      onClick={() => {}}
    />
  </CardsWrap>,
  <CardsWrap key={3}>
    <CardWideWrapper>
      <CardWide
        title={'Заголовок'}
        titleImageSrc={
          'https://images.unsplash.com/photo-1655720033654-a4239dd42d10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
        }
        description={'Описание для карточки'}
        buttons={[{ text: 'Открыть', onClick: () => {} }]}
        imageSrc={
          'https://images.unsplash.com/photo-1655720031554-a929595ffad7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
        }
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
