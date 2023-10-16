import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { TourStepExtended } from 'welcome-tour/src/components/types';

import { simpleVar, themeVars } from '@sbercloud/figma-tokens-cloud-platform';
import { Button } from '@sbercloud/uikit-product-button';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { WelcomeTour, WelcomeTourProps } from '../src';

const JoyrideSteps: TourStepExtended[] = [
  {
    title: 'Бизнес решение для вас',
    subtitle:
      'Решайте задачу с помощью наших бизнес-решений — внутри вас ждёт архитектура, преимущества и особенности конкретного решения, подробная инструкция подключения и полезные ссылки',
    content: (
      <>
        <img
          src='https://media.istockphoto.com/id/458297017/ru/%D1%84%D0%BE%D1%82%D0%BE/hello-kitty-%D1%80%D0%B8%D1%81%D1%83%D0%BD%D0%BA%D0%BE%D0%BC.jpg?s=612x612&w=0&k=20&c=32C3EyxYG4n_ynZk7RoRqNDptDmUe1i2dOYNjoQUn6U='
          alt='demo'
          style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
        />
      </>
    ),
    target: '#test-1',
    spotlightClicks: true,
  },
  {
    title: 'Бизнес решение для вас',
    subtitle: 'Решайте задачу с помощью наших бизнес-решений',
    content: 'Click this button and maybe something will happen',
    target: '#test-2',
  },
  {
    title: 'Бизнес решение для вас',
    subtitle:
      'Внутри вас ждёт архитектура, преимущества и особенности конкретного решения, подробная инструкция подключения и полезные ссылки',
    content: 'Click this button and the magic will come',
    target: '#test-3',
  },
];

const JoyrideStepsWithoutContent: TourStepExtended[] = [
  {
    title: 'Бизнес решение для вас',
    subtitle:
      'Решайте задачу с помощью наших бизнес-решений — внутри вас ждёт архитектура, преимущества и особенности конкретного решения, подробная инструкция подключения и полезные ссылки',
    content: null,
    target: '#test-1',
  },
  {
    title: 'Бизнес решение для вас',
    subtitle: 'Решайте задачу с помощью наших бизнес-решений',
    content: null,
    target: '#test-2',
  },
  {
    title: 'Бизнес решение для вас',
    subtitle:
      'Внутри вас ждёт архитектура, преимущества и особенности конкретного решения, подробная инструкция подключения и полезные ссылки',
    content: null,
    target: '#test-3',
  },
];

const meta: Meta = {
  title: 'Not stable/Welcome Tour',
  component: WelcomeTour,
};
export default meta;

function Template() {
  const [tourStarted, setTourStarted] = useState(false);
  const [steps, setSteps] = useState(JoyrideSteps);
  const [successFinal, setSuccessFinal] = useState(false);

  return (
    <div style={{ background: simpleVar(themeVars.sys.neutral.background2Level), padding: 30 }}>
      <div id='test-1' style={{ width: 400, padding: 10 }}>
        Some text
      </div>
      <div id='test-2' style={{ width: 400, padding: 10 }}>
        SberCloud UIK
      </div>
      <div id='test-3' style={{ width: 400, padding: 10 }}>
        Welcome tour component
      </div>
      <div style={{ margin: 10, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Button
          text='Start the tour'
          onClick={() => {
            setSteps(JoyrideSteps);
            setTourStarted(true);
          }}
        />
        <Button
          text='Start the tour without content'
          onClick={() => {
            setSteps(JoyrideStepsWithoutContent);
            setTourStarted(true);
          }}
        />
        {successFinal && (
          <div>
            <p>Ура, тур пройден</p>
            <Button onClick={() => setSuccessFinal(false)} text='Сброс' />
          </div>
        )}
      </div>
      <WelcomeTour
        tourSteps={steps}
        tourStarted={tourStarted}
        setTourStarted={setTourStarted}
        primaryButtonProps={{
          text: 'Вперёд',
        }}
        backButtonProps={{
          text: 'Назад',
        }}
        closeButtonProps={{
          text: 'Закрыть',
          onClick: () => setSuccessFinal(true),
        }}
      />
    </div>
  );
}

export const welcomeTour: StoryFn<WelcomeTourProps> = Template.bind({});
welcomeTour.args = {};
welcomeTour.argTypes = {};
welcomeTour.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    //TODO: change local popover to uik lib Popover
    //TODO: add Figma link to component design
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
  badges: [BADGE.BETA],
};
