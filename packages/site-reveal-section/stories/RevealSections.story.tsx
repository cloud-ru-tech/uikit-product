import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { RevealSections, RevealSectionsProps } from '../src';

const meta: Meta<RevealSectionsProps> = {
  title: 'Site/Reveal Sections',
  component: RevealSections,
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
  },
};
export default meta;

const Template: StoryFn<RevealSectionsProps> = args => (
  <div>
    <RevealSections {...args}>
      {[0, 1, 2, 3].map(index => (
        <section
          key={index}
          style={{ minHeight: '80vh', padding: 24, boxSizing: 'border-box', border: '1px solid currentColor' }}
        >
          <h2>Section {index + 1}</h2>
          <p>Scroll down. Skipped sections appear immediately, without an extra wrapper.</p>
        </section>
      ))}
    </RevealSections>
    <div style={{ height: '100vh' }} />
  </div>
);

export const Default: StoryObj<RevealSectionsProps> = {
  render: Template,
  args: {
    skipFirst: true,
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
    shouldSkip: { control: false },
    style: { control: false },
    duration: { control: { type: 'number', min: 0, step: 50 } },
    delay: { control: { type: 'number', min: 0, step: 50 } },
    offset: { control: { type: 'number', step: 4 } },
    easing: { control: 'text' },
    rootMargin: { control: 'text' },
    threshold: { control: { type: 'number', min: 0, max: 1, step: 0.1 } },
  },
};

export const RevealAll: StoryObj<RevealSectionsProps> = {
  ...Default,
  args: { ...Default.args, skipFirst: false },
};

export const SkipSelected: StoryObj<RevealSectionsProps> = {
  ...Default,
  args: { ...Default.args, shouldSkip: (_child, index) => index === 2 },
};

export const Disabled: StoryObj<RevealSectionsProps> = {
  ...Default,
  args: { ...Default.args, disabled: true },
};
