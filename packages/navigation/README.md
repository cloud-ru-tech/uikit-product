# Navigation

## Installation

`npm i @sbercloud/uikit-product-navigation`

## Usage

```tsx
import {
  DocumentationInterfaceSVG,
  NotifyInterfaceSVG,
  QuestionInterfaceSVG,
  SupportInterfaceSVG,
} from '@sbercloud/uikit-product-icons';
import { Badge } from '@sbercloud/uikit-product-badge-private';
import { PredefinedMLSpaceLogo } from '@sbercloud/uikit-product-predefined-icons-private';
import {
  Header,
  HeaderBalanceTooltip,
  HeaderLogo,
  HeaderMenu,
  HeaderProjectSelector,
  HeaderToolbar,
} from '@sbercloud/uikit-product-navigation';

function App() {
  const [workspace, setWorkspace] = useState('workspace-0');

  function handleLogoClick() {}
    
  function handleBalanceClick() {}

  function handleRechargeClick() {}

  function handleNotifyClick() {}

  function handleWorkspaceCreate() {}

  function handleWorkspaceChange(workspace: string) {
    setWorkspace(workspace);
  }

  return (
    <Header>
      <HeaderMenu.Root title='Платформы'>
        <HeaderMenu.Item icon={<QuestionInterfaceSVG />} title='ML Space' href='/ml-space' />
        <HeaderMenu.Item icon={<QuestionInterfaceSVG />} title='Enterprise' href='/enterprise' />
        <HeaderMenu.Item icon={<QuestionInterfaceSVG />} title='SVP' href='/svp' />
        <HeaderMenu.Item icon={<QuestionInterfaceSVG />} title='Advanced' href='/advanced' />
      </HeaderMenu.Root>
      <HeaderLogo href='/' onClick={handleLogoClick}>
        <PredefinedMLSpaceLogo height={16} />
      </HeaderLogo>
      <HeaderProjectSelector
        onChange={handleWorkspaceChange}
        onCreate={handleWorkspaceCreate}
        value={workspace}
        items={[
          {
            label: 'Ultrimax',
            workspaces: [
              { label: 'Zialactic', value: 'workspace-0' },
              { label: 'Zaggles', value: 'workspace-1' },
              { label: 'Isologia', value: 'workspace-2' },
              { label: 'Undertap', value: 'workspace-3' },
              { label: 'Gluid', value: 'workspace-4' },
              { label: 'Insource', value: 'workspace-5' },
            ],
          },
        ]}
      />
      <HeaderBalanceTooltip
        balance={144_401_810}
        limit={155_500_000}
        onBalanceClick={handleBalanceClick}
        onRechargeClick={handleRechargeClick}
      />
      <HeaderProjectDescription label={'ЗАО "Блачные технологии"'} />
      <HeaderToolbar.Root>
        <HeaderToolbar.Item
          icon={
            <Badge number={2} type={Badge.types.Alert}>
              <NotifyInterfaceSVG />
            </Badge>
          }
          title='Уведомления'
          onClick={handleNotifyClick}
        />
        <HeaderToolbar.Item icon={<DocumentationInterfaceSVG />} title='Документация' href='/documentation' />
        <HeaderToolbar.Item icon={<SupportInterfaceSVG />} title='Поддержка' href='/support' />
        <HeaderToolbar.ProfileMenu name='Андрей Иванов'>
          <HeaderToolbar.ProfileMenuAvatarItem title='Профиль' href='/profile' />
          <HeaderToolbar.ProfileMenuItem icon={<QuestionInterfaceSVG />} title='Выход' href='/logout' />
        </HeaderToolbar.ProfileMenu>
      </HeaderToolbar.Root>
    </Header>
  );
}
```

## Props

### Header

```ts
type HeaderProps = WithSupportProps<{
  children: ReactNode;
  className?: string;
}>;
```

### MobileHeader

```ts
type MobileHeaderProps = {
  children: ReactNode;
  className?: string;
  onMenuClick?(target: HTMLElement): void;
}
```

### MobileMenu

```ts
type MobileMenuProps = {
  children: ReactNode;
};

type MobileMenuReference = {
  toggleOpen(target: HTMLElement): void;
};
```

### HeaderBalanceTooltip

```ts
type HeaderBalanceTooltipProps = WithSupportProps<{
  balance?: number;
  limit?: number;
  onBalanceClick?: () => void;
  onRechargeClick?: () => void;
}>;
```

### HeaderLogo

```ts
type HeaderLogoProps = WithSupportProps<{
  children: ReactNode;
  href: string;
  onClick?(e?: MouseEvent<HTMLAnchorElement>): void;
}>;
```

### HeaderMenu.Root

```ts
type HeaderMenuRootProps = WithSupportProps<{
  title: string;
  children: ReactNode;
}>;
```

### HeaderMenu.Item

```ts
type HeaderMenuItemProps = WithSupportProps<{
  icon: ReactElement;
  title: string;
  href: string;
  target?: HTMLAttributeAnchorTarget;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}>;
```

### HeaderToolbar.Root

```ts
type HeaderToolbarRootProps = WithSupportProps<{
  children: ReactNode;
}>;
```

### HeaderToolbar.Item

```ts
type HeaderToolbarItemProps = WithSupportProps<{
  icon: ReactElement;
  title: string;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  onClick?: MouseEventHandler<HTMLElement>;
}>;
```

### HeaderToolbar.ProfileMenu

```ts
type HeaderToolbarProfileMenuProps = WithSupportProps<{
  name: string;
  children: ReactNode;
  src?: string;
}>;
```

### HeaderToolbar.ProfileMenuAvatarItem

```ts
type HeaderToolbarProfileMenuAvatarItemProps = Omit<HeaderToolbarProfileMenuItemProps, 'icon'>;
```

### HeaderToolbar.ProfileMenuItem

```ts
type HeaderToolbarProfileMenuItemProps = WithSupportProps<{
  icon: ReactElement;
  title: string;
  href: string;
  target?: HTMLAttributeAnchorTarget;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}>;
```

### HeaderProjectSelector

```ts
type WorkspaceOption = {
  label: string;
  value: string;
};

type ProjectOption = {
  label: string;
  value: string;
};

type ProjectPresentation = {
  label: string;
  workspaces: WorkspaceOption[];
};

type CatalogPresentation = {
  label: string;
  projects: ProjectOption[];
};

type Item = CatalogPresentation | ProjectPresentation | ProjectOption;

type HeaderProjectSelectorProps = WithSupportProps<{
  value: string;
  items: Item[];
  onChange(value: string): void;
  onCreate?(): void;
}>;
```

### HeaderProjectDescription

```ts
type HeaderProjectDescriptionProps = {
  label: string;
};
```

### Sidebar

```ts
type SidebarItemId = string | number;

type SidebarProps = WithSupportProps<{
  list: SidebarItemsGroup[];
  footerItems?: SidebarItemProps[];
  active?: SidebarItemId;
  onActiveChange: SidebarOnActiveChange;
  className?: string;
}>;

enum Mode {
  Slide = 'slide',
  Accordion = 'accordion',
}

enum Status {
  Active = 'active',
  Suspended = 'suspended',
}

type SidebarItemProps = {
  id: SidebarItemId;
  label: string;
  href?: string;
  icon?: ReactElement;
  disabled?: boolean;
  showNewLabel?: boolean;
  locked?: boolean;
  count?: number;
  nestedList?: SidebarItemsGroup[];
  status?: Status;
  mode?: Mode;
};

type SidebarOnActiveChange = (item: Partial<Pick<SidebarItemProps, 'id' | 'href'>>) => void;

type SidebarItemsGroup = {
  heading?: string;
  items: SidebarItemProps[];
};
```
