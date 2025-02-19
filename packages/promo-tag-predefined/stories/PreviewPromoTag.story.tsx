import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { PREVIEW_PROMO_TAG_CONTEXT } from 'promo-tag-predefined/src/components/constants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PreviewPromoTag } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/PromoTag Predefined/Preview PromoTag',
  component: PreviewPromoTag,
};
export default meta;

const Template: StoryFn = ({ ...args }) => (
  <div className={styles.story}>
    <PreviewPromoTag {...args} />
  </div>
);

export const previewPromoTag: StoryObj = {
  render: Template,
  args: {
    context: PREVIEW_PROMO_TAG_CONTEXT.Service,
    trigger: 'hover',
    placement: 'top',
  },
  argTypes: {},
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
