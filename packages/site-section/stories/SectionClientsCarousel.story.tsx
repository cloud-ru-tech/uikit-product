import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useMemo } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SectionClientsCarousel, SectionClientsCarouselProps } from '../src';
import { SECTION_COLORS } from '../src/constants';
import dodo from './assets/client-dodo.svg';
import magnit from './assets/client-magnit.svg';
import pyatyorochka from './assets/client-pyatyorochka.svg';
import uralInterior from './assets/client-ural-interior.png';
import { LAYOUT_TYPE } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Section/Clients Carousel',
  component: SectionClientsCarousel,
};

export default meta;

type StoryProps = SectionClientsCarouselProps & {
  clientsAmount: number;
};

const SAMPLE_CLIENTS: SectionClientsCarouselProps['items'] = [
  {
    img: dodo as unknown as string,
    alt: 'dodo',
  },
  {
    img: magnit as unknown as string,
    alt: 'magnit',
  },
  {
    img: uralInterior,
    alt: 'uralInterior',
  },
  {
    img: pyatyorochka as unknown as string,
    alt: 'pyatyorochka',
  },
];

const generateRequiredAmountOfClients = (clientsAmount: number): SectionClientsCarouselProps['items'] => {
  const result: SectionClientsCarouselProps['items'] = [];
  let counter = 0;
  let index = 0;

  while (counter < clientsAmount) {
    if (index === SAMPLE_CLIENTS.length) {
      index = 0;
    }

    result.push(SAMPLE_CLIENTS[index]);

    index += 1;
    counter += 1;
  }

  return result;
};

const Template: StoryFn<StoryProps> = ({ id, title, clientsAmount, layoutType, backgroundColor }) => {
  const displayedClients = useMemo(() => generateRequiredAmountOfClients(clientsAmount), [clientsAmount]);

  return (
    <div className={styles.resizeWrapper}>
      <SectionClientsCarousel
        id={id}
        title={title}
        items={displayedClients}
        layoutType={layoutType}
        backgroundColor={backgroundColor}
      />
    </div>
  );
};

export const clientsCarousel: StoryObj<StoryProps> = {
  render: Template,
  args: {
    id: 'section-clients',
    title: 'Помогаем клиентам внедрять инновации',
    clientsAmount: 9,
    backgroundColor: SECTION_COLORS.NeutralBackground1Level,
    layoutType: 'desktop',
  },
  argTypes: {
    backgroundColor: { control: { type: 'select' } },
    clientsAmount: {
      name: '[Story]: Amount of sample clients',
    },
    layoutType: {
      name: '[Story]: Layout type',
      options: Object.values(LAYOUT_TYPE),
      control: {
        type: 'radio',
      },
    },
  },
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=7575-130501&t=d6HroXimun0WBR5b-0',
    },
  },
};
