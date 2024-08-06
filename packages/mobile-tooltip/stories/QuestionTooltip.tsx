import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Link } from '@snack-uikit/link';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MobileQuestionTooltip, MobileQuestionTooltipProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Mobile/Tooltip/Question Tooltip',
  component: MobileQuestionTooltip,
};
export default meta;

type StoryProps = MobileQuestionTooltipProps;
const Template: StoryFn<StoryProps> = ({ ...args }) => (
  <div className={styles.story}>
    <MobileQuestionTooltip
      {...args}
      tip={
        args.tip || (
          <div>
            do not press this button, please
            <br />
            <Link href='#' text='read why' textMode='accent' appearance='invert-neutral' />
          </div>
        )
      }
    />
  </div>
);

export const questionTooltip: StoryObj<StoryProps> = Template.bind({});

questionTooltip.args = {
  size: 's',
  trigger: 'click',
  placement: 'top',
};

questionTooltip.argTypes = {
  tip: { type: 'string' },
  open: { table: { disable: true } },
  onOpenChange: { table: { disable: true } },
};

questionTooltip.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=7%3A3108&mode=design',
  },
  a11y: {
    element: `.${styles.story}`,
  },
};
