import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { RevealSection, RevealSectionProps } from '../src';

const meta: Meta<RevealSectionProps> = {
  title: 'Site/Reveal Section',
  component: RevealSection,
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
  },
};
export default meta;

const Template: StoryFn<RevealSectionProps> = args => (
  <div>
    <div style={{ minHeight: '100vh', padding: 24, boxSizing: 'border-box' }}>
      Scroll down to reveal the section. Remount the story to replay the animation.
    </div>
    <RevealSection {...args}>
      <section style={{ minHeight: 240, padding: 24, border: '1px solid currentColor' }}>
        <h2>Reveal section</h2>
        <p>This section fades in and moves up once.</p>
      </section>
    </RevealSection>
    <div style={{ height: '100vh' }} />
  </div>
);

export const Default: StoryObj<RevealSectionProps> = {
  render: Template,
  args: {
    disabled: false,
    duration: 650,
    delay: 0,
    offset: 28,
    easing: 'ease',
    rootMargin: '0px 0px -40px 0px',
    threshold: 0,
  },
  argTypes: {
    children: { control: false },
    style: { control: false },
    duration: { control: { type: 'number', min: 0, step: 50 } },
    delay: { control: { type: 'number', min: 0, step: 50 } },
    offset: { control: { type: 'number', step: 4 } },
    easing: { control: 'text' },
    rootMargin: { control: 'text' },
    threshold: { control: { type: 'number', min: 0, max: 1, step: 0.1 } },
  },
};

export const Disabled: StoryObj<RevealSectionProps> = {
  ...Default,
  args: { ...Default.args, disabled: true },
};
