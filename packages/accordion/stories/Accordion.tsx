import { styled } from '@linaria/react';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { DeleteInterfaceSVG, EditInterfaceSVG } from '@sbercloud/uikit-product-icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Accordion, AccordionProps } from '../src';

const meta: Meta = {
  title: 'Not stable/Accordion',
  component: Accordion,
};
export default meta;

const ACTIONS = {
  delete: {
    onClick: () => {},
    icon: <DeleteInterfaceSVG />,
  },
  edit: {
    onClick: () => {},
    icon: <EditInterfaceSVG />,
  },
  undefined: undefined,
};

type StoryProps = {
  mode: 'controlled' | 'uncontrolled';
  contentLines: number;
} & AccordionProps;

const AccordionContentStyled = styled.div`
  span + span {
    display: inline-block;
    padding-top: 32px;
  }
`;

const AccordionContent = ({ content, contentLines }: Pick<StoryProps, 'content' | 'contentLines'>) => (
  <AccordionContentStyled>
    {Array.from({ length: contentLines }, (_, idx) => `${idx + 1}. ${content}`).map(line => (
      <span key={line}>{line}</span>
    ))}
  </AccordionContentStyled>
);

const Template = ({ mode, content, contentLines, ...rest }: StoryProps) => {
  const [isOpenControlled, toggleIsOpenControlled] = useState(true);

  const props: AccordionProps = {
    ...rest,
    content: <AccordionContent content={content} contentLines={contentLines} />,
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
  contentLines: 1,
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
  contentLines: {
    name: '[Stories]: Content',
    description: 'The component adjusts to its content size. You can change it here',
    control: {
      type: 'number',
      min: 1,
    },
  },
  action: {
    name: 'action',
    options: Object.keys(ACTIONS),
    mapping: ACTIONS,
    control: {
      type: 'radio',
    },
  },
};

accordion.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/cdtItYHTIEGB0wMZPAp729/%5BLIB%5D-Platform-DS-%E2%88%99-Sandbox?type=design&node-id=1326-174372&t=SWIlCe8vYWEpjbI3-0',
  },
};
