import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { PLACEMENT, TRIGGER } from '@snack-uikit/popover-private';
import { toaster } from '@snack-uikit/toaster';
import { TooltipProps } from '@snack-uikit/tooltip';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PromoTagPredefined, PromoTagPredefinedProps } from '../src';
import { PREVIEW_CONTEXT, VARIANTS } from '../src/components/constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Promo Tag Predefined',
  component: PromoTagPredefined,
};
export default meta;

type StoryProps = PromoTagPredefinedProps & {
  isClickable?: boolean;
} & Pick<TooltipProps, 'placement' | 'trigger'>;

const Template: StoryFn<StoryProps> = ({ isClickable, placement, trigger, ...args }) => (
  <div className={styles.story}>
    <PromoTagPredefined
      {...args}
      tooltip={{ trigger, placement }}
      onClick={
        isClickable
          ? () => {
              toaster.userAction.success({ label: 'Promo tag clicked!' });
            }
          : undefined
      }
    />
  </div>
);

export const promoTagPredefined: StoryObj<StoryProps> = {
  render: Template,
  args: {
    variant: VARIANTS.Preview,
    context: PREVIEW_CONTEXT.Service,
    trigger: 'hover',
    placement: 'top',
    isClickable: false,
  },
  argTypes: {
    trigger: {
      name: '[Story]: Триггер для тултипа',
      options: Object.values(TRIGGER),
      control: { type: 'select' },
    },
    placement: {
      name: '[Story]: Позиция для тултипа',
      options: Object.values(PLACEMENT),
      control: { type: 'select' },
    },
    isClickable: { name: '[Story]: Добавить обработчик клика на промо-тэг' },
    context: { if: { arg: 'variant', eq: VARIANTS.Preview } },
    tooltip: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/kPTe6tEqYw5EAbmY2pl7vE/PDS-1630-%E2%80%A2-PromoTag-Predefined?node-id=27760-4572&t=4uWuEQBJ4y0W4Xzv-4',
    },
  },
};
