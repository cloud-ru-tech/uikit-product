# Sidebar

## Installation

`npm i @sbercloud/uikit-product-sidebar`

## Props

```ts
type SidebarProps = WithSupportProps<{
  list: SidebarItemsGroup[];
  footerItems?: SidebarItem[];
  active?: SidebarItemId;
  onActiveChange: SidebarOnActiveChange;
  className?: string;
}>;

type SidebarMobileProps = WithSupportProps<{
  list: SidebarItemsGroup[];
  footerItems?: SidebarItem[];
  active?: SidebarItemId;
  onActiveChange: SidebarOnActiveChange;
}>;

type SidebarItemId = string | number;

enum Mode {
  Slide = 'slide',
  Accordion = 'accordion',
}

enum Status {
  Active = 'active',
  Suspended = 'suspended',
}

type BaseSidebarItem = {
  id: SidebarItemId;
  label: string;
  href?: string;
  icon?: ReactElement;
  disabled?: boolean;
  labelText?: boolean;
  locked?: boolean;
  count?: number;
  mode?: Mode;
  status?: Status;
  nestedList?: SidebarItemsGroup[];
};

type AccordionSidebarItem = BaseSidebarItem & {
  mode: Mode.Accordion;
  nestedList: SidebarItemsGroup[];
};

type SlideSidebarItem = BaseSidebarItem & {
  href: string;
};

type SidebarItem = AccordionSidebarItem | SlideSidebarItem;

type SidebarOnActiveChange = (item: Partial<Pick<SidebarItem, 'id' | 'href'>>) => void;

type SidebarItemsGroup = {
  heading?: string;
  items: SidebarItem[];
};
```

[Changelog](./CHANGELOG.md)
