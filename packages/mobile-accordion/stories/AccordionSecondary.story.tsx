import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MobileAccordionProps, MobileAccordionSecondary } from '../src';
import { DEFAULT_PROPS, STORY_TEST_IDS } from './constants';
import { Content } from './helperComponents';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Mobile/Accordion/AccordionSecondary',
  component: MobileAccordionSecondary,
};

export default meta;

const Template: StoryFn<MobileAccordionProps> = ({ selectionMode }: MobileAccordionProps) => {
  const [expanded, setExpanded] = useState<string | string[] | undefined>(undefined);

  useEffect(() => {
    setExpanded(undefined);
  }, [selectionMode]);

  return (
    <div className={styles.wrapper}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <MobileAccordionSecondary expanded={expanded} onExpandedChange={setExpanded} selectionMode={selectionMode}>
        {Array.from({ length: 2 }).map((_, i) => (
          <MobileAccordionSecondary.CollapseBlock
            key={i}
            id={String(i)}
            header={<MobileAccordionSecondary.CollapseBlockHeader {...DEFAULT_PROPS} />}
            data-test-id={STORY_TEST_IDS[i]}
          >
            <Content />
          </MobileAccordionSecondary.CollapseBlock>
        ))}
      </MobileAccordionSecondary>
    </div>
  );
};

export const accordionSecondary = {
  render: Template,

  args: {
    selectionMode: 'single',
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
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A262646&mode=design',
    },
  },
};
