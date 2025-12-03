import cn from 'classnames';
import ScrollContainer from 'react-indiana-drag-scroll';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Divider } from '@snack-uikit/divider';

import { NavbarItem, NavbarItemProps } from '../helperComponents';
import styles from './styles.module.scss';

type AppearanceNeutral = {
  colorText: 'neutral';
  dividerBackgroundColor: 'neutral';
};

type AppearanceInvert = {
  colorText: 'invert';
  dividerBackgroundColor: 'invert';
};

type AppereanceType = AppearanceNeutral | AppearanceInvert;

const APPEARANCE_NEUTRAL: AppearanceNeutral = {
  colorText: 'neutral',
  dividerBackgroundColor: 'neutral',
};

export type SiteNavbarProps = WithSupportProps<{
  items: NavbarItemProps[];
  onItemClick(id: string, text: string): void;
  active?: string;
  className?: string;
  topPosition?: number;
  appereance?: AppereanceType;
}>;

export function SiteNavbar({
  items,
  className,
  onItemClick,
  active,
  topPosition,
  appereance = APPEARANCE_NEUTRAL,
  ...rest
}: SiteNavbarProps) {
  return (
    <div
      className={cn(styles.navbar, className)}
      style={topPosition ? { top: `${topPosition}px` } : undefined}
      {...extractSupportProps(rest)}
    >
      <Divider className={styles.divider} data-background-color={appereance?.dividerBackgroundColor} />
      <ScrollContainer className={styles.navbarItemsWrapper}>
        {items.map(item => (
          <NavbarItem
            key={item.id}
            {...item}
            active={active === item.id}
            appereance={appereance?.colorText}
            onClick={onItemClick}
          />
        ))}
      </ScrollContainer>
    </div>
  );
}
