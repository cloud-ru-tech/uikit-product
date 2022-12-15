# Header

## Installation
`npm i @sbercloud/uikit-product-header`

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
type MobileMenuProps = WithSupportProps<{
  children: ReactNode;
}>;

type MobileMenuReference = {
  toggleOpen(target: HTMLElement): void;
  close(): void;
};
```

### HeaderBalanceTooltip

```ts
type HeaderBalanceTooltipProps = WithSupportProps<{
  balance?: number;
  limit?: number;
  onBalanceClick?(): void;
  onRechargeClick?(): void;
  isMobile?: boolean;
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

### HeaderMenu

#### Root

```ts
type HeaderMenuRootProps = WithSupportProps<{
  title: string;
  children: ReactNode;
}>;
```

#### Item

```ts
type HeaderMenuItemProps = WithSupportProps<{
  icon: ReactElement;
  title: string;
  href: string;
  target?: HTMLAttributeAnchorTarget;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}>;
```

### HeaderToolbar

#### Root

```ts
type HeaderToolbarRootProps = WithSupportProps<{
  isMobile?: boolean;
  children: ReactNode;
}>;
```

#### Item

```ts
type HeaderToolbarItemProps = WithSupportProps<{
  className?: string;
  icon: ReactElement;
  title: string;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  onClick?: MouseEventHandler<HTMLElement>;
  isMobile?: boolean;
}>;
```

#### ProfileItem

```ts
type HeaderToolbarProfileItemProps = Omit<HeaderToolbarItemProps, 'icon'> & {
  name: string;
  src?: string;
};
```

#### ProfileMenu

```ts
type HeaderToolbarProfileMenuProps = WithSupportProps<{
  name: string;
  children: ReactNode;
  src?: string;
}>;
```

#### ProfileMenuAvatarItem

```ts
type HeaderToolbarProfileMenuAvatarItemProps = Omit<HeaderToolbarProfileMenuItemProps, 'icon'>;
```

#### ProfileMenuItem

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
type HeaderProjectSelectorProps = WithSupportProps<{
  value: string;
  items: Item[];
  onChange(value: string): void;
  onCreate?(): void;
  onEdit?(value: string): void;
  createDisabledReason?: string;
  isMobile?: boolean;
}>;

type Item = ProjectGroup | WorkspaceGroup;

type ProjectGroup = {
  label: string;
  projects: ProjectOption[];
};

type ProjectOption = {
  label: string;
  value: string;
  editable?: boolean;
};

type WorkspaceGroup = {
  label: string;
  workspaces: WorkspaceOption[];
};

type WorkspaceOption = {
  label: string;
  value: string;
  editable?: boolean;
};
```

### HeaderProjectDescription

```ts
type HeaderProjectDescriptionProps = {
  label: string;
};
```

## Usage

```tsx
import {
  DocumentationInterfaceSVG,
  NotifyInterfaceSVG,
  QuestionInterfaceSVG,
  SupportInterfaceSVG,
} from '@sbercloud/uikit-product-icons';
import { Badge } from '@sbercloud/uikit-product-badge-private';
import { Divider } from '@sbercloud/uikit-product-divider';
import { PredefinedMLSpaceLogo } from '@sbercloud/uikit-product-predefined-icons-private';
import {
  Header,
  HeaderBalanceTooltip,
  HeaderLogo,
  HeaderMenu, 
  HeaderProjectDescription,
  HeaderProjectSelector,
  HeaderToolbar,
  MobileHeader,
  MobileMenu,
  MobileMenuReference,
} from '@sbercloud/uikit-product-header';
import { useMatchMedia } from '@sbercloud/uikit-product-utils';
import { SidebarMobile } from '@sbercloud/uikit-product-sidebar';

function App() {
  const { isMobile } = useMatchMedia();
  const [workspace, setWorkspace] = useState('workspace-0');
  const mobileMenuRef = useRef<MobileMenuReference>(null);

  function handleLogoClick() {}
    
  function handleBalanceClick() {}

  function handleRechargeClick() {}

  function handleNotifyClick() {}

  function handleWorkspaceCreate() {}

  function handleWorkspaceChange(workspace: string) {
    setWorkspace(workspace);
  }
  
  if(isMobile) {
    return (
      <>
        <MobileHeader onMenuClick={target => mobileMenuRef.current?.toggleOpen(target)}>
          <HeaderLogo {...} />
          <HeaderBalanceTooltip isMobile {...} />
        </MobileHeader>
          <MobileMenu ref={mobileMenuRef}>
            <HeaderToolbar.Root isMobile>
              <HeaderToolbar.ProfileItem isMobile {...} />
              <HeaderToolbar.Item isMobile {...} />
            </HeaderToolbar.Root>
            <Divider />
            <HeaderProjectSelector isMobile {...} />
            <SidebarMobile {...} />
          </MobileMenu>
        </>
      );
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

[Changelog](./CHANGELOG.md)