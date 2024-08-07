import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MobileAccordionPrimary, MobileAccordionProps, MobileAccordionSecondary } from '../src';
import { DEFAULT_PROPS, STORY_TEST_IDS } from './constants';
import { Content } from './helperComponents';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Mobile/Accordion/AccordionPrimary',
  component: MobileAccordionPrimary,
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
      <MobileAccordionPrimary expanded={expanded} onExpandedChange={setExpanded} selectionMode={selectionMode}>
        <MobileAccordionPrimary.CollapseBlock
          id='1'
          data-test-id={STORY_TEST_IDS[0]}
          header={<MobileAccordionPrimary.CollapseBlockHeader {...DEFAULT_PROPS} />}
        >
          <MobileAccordionSecondary selectionMode={selectionMode}>
            {Array.from({ length: 2 }).map((_, i) => (
              <MobileAccordionSecondary.CollapseBlock
                key={i}
                id={String(i)}
                header={<MobileAccordionSecondary.CollapseBlockHeader {...DEFAULT_PROPS} />}
              >
                <Content />
              </MobileAccordionSecondary.CollapseBlock>
            ))}
          </MobileAccordionSecondary>
        </MobileAccordionPrimary.CollapseBlock>

        <MobileAccordionPrimary.CollapseBlock
          id='2'
          data-test-id={STORY_TEST_IDS[1]}
          header={<MobileAccordionPrimary.CollapseBlockHeader {...DEFAULT_PROPS} />}
        >
          <MobileAccordionSecondary selectionMode={selectionMode}>
            {Array.from({ length: 2 }).map((_, i) => (
              <MobileAccordionSecondary.CollapseBlock
                key={i}
                id={String(i)}
                header={<MobileAccordionSecondary.CollapseBlockHeader {...DEFAULT_PROPS} />}
              >
                <Content />
              </MobileAccordionSecondary.CollapseBlock>
            ))}
          </MobileAccordionSecondary>
        </MobileAccordionPrimary.CollapseBlock>
      </MobileAccordionPrimary>
    </div>
  );
};

export const accordionPrimary = Template.bind({});

accordionPrimary.args = {
  selectionMode: 'single',
};

accordionPrimary.argTypes = {};

accordionPrimary.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A262646&mode=design',
  },
};
