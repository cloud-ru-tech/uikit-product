import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';

import { FieldSelectProps } from '@snack-uikit/fields';
import { PaginationProps } from '@snack-uikit/pagination';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SectionBasic, SectionBasicProps } from '../src';
import { SECTION_COLORS } from '../src/constants';
import { LAYOUT_TYPE } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Section/Basic',
  component: SectionBasic,
};
export default meta;

type StoryProps = SectionBasicProps & {
  showTitle?: boolean;
  showTabs?: boolean;
  showFilters?: boolean;
  showPagination?: boolean;
  showLoadMoreButton?: boolean;
};

type TabsConfig = Required<SectionBasicProps['tabBarItems']>;

const randomDataItems = ['First', 'Second', 'Third', 'Forth', 'Fifth'];

const createTab = (item: string) => ({
  value: item.toLowerCase(),
  label: item,
});

const tabsConfig: TabsConfig = randomDataItems.map(createTab);

const options: FieldSelectProps['options'] = randomDataItems.map(item => ({
  option: item,
  value: item.toLowerCase(),
}));

const createFilterSelectProps = (item: string) => ({
  label: `${item} filter`,
  placeholder: 'Placeholder',
  options: [...options],
});

const filtersConfig: FieldSelectProps[] = randomDataItems.slice(0, 3).map(createFilterSelectProps);

const handleShowMoreButtonClick = () => alert('Clicked!');

const Template: StoryFn<StoryProps> = ({
  showTitle,
  showTabs,
  showFilters,
  showPagination,
  showLoadMoreButton,
  id,
  title,
  description,
  layoutType,
  titleSectionSize,
  backgroundColor,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const paginationConfig = useMemo(() => {
    const config: PaginationProps = {
      total: 99,
      page: currentPage,
      onChange: setCurrentPage,
    };

    return config;
  }, [currentPage]);

  return (
    <div className={styles.resizeWrapper}>
      <SectionBasic
        id={id}
        title={showTitle ? title : undefined}
        description={showTitle ? description : undefined}
        tabBarItems={showTabs ? tabsConfig : undefined}
        filterItems={showFilters ? filtersConfig : undefined}
        pagination={showPagination ? paginationConfig : undefined}
        onLoadMoreClick={showLoadMoreButton ? handleShowMoreButtonClick : undefined}
        layoutType={layoutType}
        titleSectionSize={titleSectionSize}
        backgroundColor={backgroundColor}
      >
        hello world
      </SectionBasic>
    </div>
  );
};

export const basic: StoryObj<StoryProps> = {
  render: Template,
  args: {
    id: 'section-basic',
    layoutType: LAYOUT_TYPE.Desktop,
    backgroundColor: SECTION_COLORS.NeutralBackground1Level,
    title: 'Заголовок',
    description: 'Описание',
    titleSectionSize: 'm',
    showTitle: true,
    showTabs: true,
    showFilters: true,
    showPagination: true,
    showLoadMoreButton: true,
  },
  argTypes: {
    backgroundColor: { control: { type: 'select' } },
    layoutType: {
      name: '[Story]: Layout type',
      options: Object.values(LAYOUT_TYPE),
      control: {
        type: 'radio',
      },
    },
    showTitle: {
      name: '[Stories]: show title',
      control: { type: 'boolean' },
    },
    showTabs: {
      name: '[Stories]: show tabs',
      control: { type: 'boolean' },
    },
    showFilters: {
      name: '[Stories]: show filters',
      control: { type: 'boolean' },
    },
    showPagination: {
      name: '[Stories]: show pagination',
      control: { type: 'boolean' },
    },
    showLoadMoreButton: {
      name: '[Stories]: show load more button',
      control: { type: 'boolean' },
    },
    tabBarItems: { table: { disable: true } },
    filterItems: { table: { disable: true } },
    pagination: { table: { disable: true } },
    onLoadMoreClick: { table: { disable: true } },
  },
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=6874-577764&node-type=section&m=dev',
    },
  },
};
