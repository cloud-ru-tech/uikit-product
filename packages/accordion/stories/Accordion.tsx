import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Accordion, AccordionProps } from '../src';

const meta: Meta = {
  title: 'Not stable/Accordion',
  component: Accordion,
};
export default meta;

type StoryProps = {
  mode: 'controlled' | 'uncontrolled';
} & AccordionProps;

const Template = ({ mode, ...rest }: StoryProps) => {
  const [isOpenControlled, toggleIsOpenControlled] = useState(true);

  const props: AccordionProps = {
    ...rest,
    ...(mode === 'controlled' && {
      isOpen: isOpenControlled,
      onChange: prev => {
        toggleIsOpenControlled(!prev);
        action('State was changed in controlled mode')(`Is opened now: ${!prev}`);
      },
    }),
  };

  return <Accordion {...props} />;
};

export const accordion: StoryFn<StoryProps> = Template.bind({});

accordion.args = {
  mode: 'uncontrolled',
  header: 'Accordion Header',
  subheader: 'Accordion Subheader',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  tooltip: 'Tooltip text',
  variant: Accordion.variants.Primary,
  disabled: false,
};

accordion.argTypes = {
  mode: {
    name: '[Stories]: Mode',
    description: 'Uncontrolled mode is active by default. Pass {isOpen, onChange} props to control internal state.',
    options: ['controlled', 'uncontrolled'],
    control: {
      type: 'radio',
    },
  },
};

accordion.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/cdtItYHTIEGB0wMZPAp729/%5BLIB%5D-Platform-DS-%E2%88%99-Sandbox?type=design&node-id=1326-174372&t=SWIlCe8vYWEpjbI3-0',
  },
};
