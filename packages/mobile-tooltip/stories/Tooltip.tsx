import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { ButtonFilled } from '@snack-uikit/button';
import { Link } from '@snack-uikit/link';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MobileTooltip, MobileTooltipProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Mobile/Tooltip/Tooltip',
  component: MobileTooltip,
};
export default meta;

type StoryProps = MobileTooltipProps;
const Template: StoryFn<StoryProps> = ({ ...args }) => (
  <>
    <div className={styles.story}>
      <MobileTooltip
        {...args}
        tip={
          args.tip || (
            <div>
              do not press this button, please do not press this button, please do not press this button, please do not
              press this button, please do not press this button, please
              <br />
              <Link href='#' text='read why' textMode='accent' appearance='invert-neutral' />
            </div>
          )
        }
      >
        <ButtonFilled label='Reference button' data-test-id='button-with-tooltip' />
      </MobileTooltip>
    </div>
    <div data-test-id='activity-removal' role='button' tabIndex={0} className={styles.item} />
  </>
);

export const tooltip: StoryObj<StoryProps> = Template.bind({});
tooltip.args = {
  trigger: 'hover',
  placement: 'top',
  disableMaxWidth: false,
};
tooltip.argTypes = { tip: { type: 'string' } };

tooltip.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=7%3A3034&mode=design',
  },
  a11y: {
    element: `.${styles.story}`,
  },
};
