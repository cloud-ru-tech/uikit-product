import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';

import { WithLayoutType } from '@sbercloud/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Layout, LayoutProps } from '../src';
import { LAYOUT_TYPE } from './constants';
import { SiteFooter } from './helperComponents/SiteFooter';
import { SiteHeader } from './helperComponents/SiteHeader';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Layout',
  component: Layout,
};

type StoryProps = WithLayoutType<LayoutProps>;

const Template = ({ layoutType }: StoryProps) => (
  <div className={cn(styles.body, styles.fullPageHeight)}>
    <Layout>
      <Layout.Header data-test-id='header-test-id' data-attr='layout-header'>
        <SiteHeader layoutType={layoutType} />
      </Layout.Header>
      <Layout.Main layoutType={layoutType}>
        <Layout.SectionWrapper layoutType={layoutType} className={styles.sampleSection}>
          <div className={styles.sampleSection}>Какое-то содержимое</div>
        </Layout.SectionWrapper>
      </Layout.Main>
      <Layout.Footer layoutType={layoutType}>
        <SiteFooter layoutType={layoutType} />
      </Layout.Footer>
    </Layout>
  </div>
);

export const layout: StoryObj<StoryProps> = {
  render: Template,
  args: {
    layoutType: LAYOUT_TYPE.Desktop,
  },
  argTypes: {
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
  },
};

export default meta;
