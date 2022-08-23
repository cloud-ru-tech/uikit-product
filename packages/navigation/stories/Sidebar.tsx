import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { MouseEvent, useEffect, useState } from 'react';

import { ChristofariServiceSVG } from '@sbercloud/uikit-product-icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Sidebar, SidebarItemId, SidebarProps } from '../src/components';

export default {
  title: 'Not stable/Navigation/Sidebar',
  component: Sidebar,
} as Meta;

const Wrap = styled.div`
  height: 600px;
`;

const Template: Story<SidebarProps> = ({ selected, ...args }) => {
  const [selectedItem, setSelectedItem] = useState<SidebarItemId | undefined>(selected);

  useEffect(() => {
    setSelectedItem(selected);
  }, [selected]);

  const handleItemClick = (e: MouseEvent, id: string | number) => {
    setSelectedItem(id);
  };

  const handleBackClick = () => {
    setSelectedItem(undefined);
  };

  return (
    <Wrap>
      <Sidebar {...args} selected={selectedItem} onItemClick={handleItemClick} onBackClick={handleBackClick} />
    </Wrap>
  );
};

export const sidebar = Template.bind({});
sidebar.args = {
  selected: 'first level 1-2',
  list: [
    {
      items: [
        {
          id: 'null-level item',
          text: 'null-level title',
          href: '/',
          icon: <ChristofariServiceSVG />,
          nestedList: [
            {
              items: [
                {
                  id: 'null-level nested item 1',
                  text: 'null-level nested item 1',
                  href: '/',
                  icon: <ChristofariServiceSVG />,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      heading: 'first heading',
      items: [
        {
          id: 'first-level 1-1',
          text: 'with nested items',
          href: '/',
          icon: <ChristofariServiceSVG />,
          nestedList: [
            {
              heading: 'second level',
              items: [
                {
                  id: 'first-level-nested 1.1',
                  text: 'second level with nested items',
                  href: '/',
                  icon: <ChristofariServiceSVG />,
                  nestedList: [
                    {
                      heading: 'third level',
                      items: [
                        {
                          id: 'first-level-nested 1.1.1',
                          text: 'third level with nested items',
                          href: '/',
                          icon: <ChristofariServiceSVG />,
                          nestedList: [
                            {
                              heading: 'fourth level',
                              items: [
                                {
                                  id: 'first-level-nested 1.1.1.1',
                                  text: 'fourth level 1',
                                  href: '/',
                                  icon: <ChristofariServiceSVG />,
                                },
                                {
                                  id: 'first-level-nested 1.1.1.2',
                                  text: 'fourth level 2',
                                  href: '/',
                                  icon: <ChristofariServiceSVG />,
                                },
                                {
                                  id: 'first-level-nested 1.1.1.3',
                                  text: 'fourth level 3',
                                  href: '/',
                                  icon: <ChristofariServiceSVG />,
                                  disabled: true,
                                },
                              ],
                            },
                            {
                              items: [
                                {
                                  id: 'first-level-nested 1.1.2.1',
                                  text: 'first 4 2',
                                  href: '/',
                                  icon: <ChristofariServiceSVG />,
                                },
                                {
                                  id: 'first-level-nested 1.1.2.2',
                                  text: 'second',
                                  href: '/',
                                  icon: <ChristofariServiceSVG />,
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 'first-level-nested 1.1.2',
                          text: 'third level 2',
                          href: '/',
                          icon: <ChristofariServiceSVG />,
                        },
                        {
                          id: 'first-level-nested 1.1.3',
                          text: 'third level 3',
                          href: '/',
                          icon: <ChristofariServiceSVG />,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 'first-level-nested 1.2',
                  text: 'accordion',
                  href: '/',
                  icon: <ChristofariServiceSVG />,
                  mode: Sidebar.listModes.Accordion,
                  nestedList: [
                    {
                      items: [
                        {
                          id: 'accordion 1',
                          text: 'accordion 1',
                          href: '/',
                          icon: <ChristofariServiceSVG />,
                        },
                        {
                          id: 'accordion 2',
                          text: 'accordion 2',
                          href: '/',
                          icon: <ChristofariServiceSVG />,
                          mode: Sidebar.listModes.Accordion,
                          nestedList: [
                            {
                              items: [
                                {
                                  id: 'accordion 2.1',
                                  text: 'accordion 2.1',
                                  href: '/',
                                  icon: <ChristofariServiceSVG />,
                                },
                                {
                                  id: 'accordion 2.2',
                                  text: 'accordion 2.2',
                                  href: '/',
                                  icon: <ChristofariServiceSVG />,
                                },
                                {
                                  id: 'accordion 2.3',
                                  text: 'accordion 2.3',
                                  href: '/',
                                  icon: <ChristofariServiceSVG />,
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 'accordion 3',
                          text: 'accordion 3',
                          href: '/',
                          icon: <ChristofariServiceSVG />,
                        },
                        {
                          id: 'accordion 4',
                          text: 'accordion 4',
                          href: '/',
                          icon: <ChristofariServiceSVG />,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 'first-level-nested 1.3',
                  text: 'second level 3',
                  href: '/',
                  icon: <ChristofariServiceSVG />,
                },
                {
                  id: 'first-level-nested 1.4',
                  text: 'second level 4',
                  href: '/',
                  icon: <ChristofariServiceSVG />,
                  disabled: true,
                },
                {
                  id: 'first-level-nested 1.5',
                  text: 'second level 5',
                  href: '/',
                  icon: <ChristofariServiceSVG />,
                  isLocked: true,
                },
              ],
            },
            {
              heading: 'second level heading',
              items: [
                {
                  id: 'first-level-nested 2.1',
                  text: 'first-level-nested 2',
                  href: '/',
                  icon: <ChristofariServiceSVG />,
                },
              ],
            },
          ],
        },
        {
          id: 'first level 1-2',
          text: 'first level 1-2',
          href: '/',
          icon: <ChristofariServiceSVG />,
        },
        {
          id: 'first level 1-3',
          text: 'first level 1-3',
          href: '/',
          icon: <ChristofariServiceSVG />,
          disabled: true,
        },
        {
          id: 'first level 1-4',
          text: 'first level 1-4',
          href: '/',
          icon: <ChristofariServiceSVG />,
          disabled: true,
        },
      ],
    },
    {
      heading: 'second heading',
      items: [
        {
          id: 'first-level 2-1',
          text: 'first-level 2-1',
          href: '/',
          icon: <ChristofariServiceSVG />,
        },
        {
          id: 'first-level 2-2',
          text: 'first-level 2-2',
          href: '/',
          icon: <ChristofariServiceSVG />,
          isLocked: true,
        },
        {
          id: 'first-level 2-3',
          text: 'first-level 2-3',
          href: '/',
          icon: <ChristofariServiceSVG />,
          isNew: true,
        },
        {
          id: 'first-level 2-4',
          text: 'first-level 2-4',
          href: '/',
          icon: <ChristofariServiceSVG />,
          count: 2,
        },
      ],
    },
  ],
  footerItems: [
    {
      id: 'footer first',
      text: 'footer first',
      href: '/',
      icon: <ChristofariServiceSVG />,
    },
    {
      id: 'footer second',
      text: 'footer second',
      href: '/',
      icon: <ChristofariServiceSVG />,
    },
    {
      id: 'footer third',
      text: 'footer third',
      href: '/',
      icon: <ChristofariServiceSVG />,
    },
  ],
};
sidebar.argTypes = {};
sidebar.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-DS%E3%83%BBComponents?node-id=802%3A0',
  },
};
