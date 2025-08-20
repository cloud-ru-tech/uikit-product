import { Breadcrumbs, BreadcrumbsProps } from '@snack-uikit/breadcrumbs';

import styles from './styles.module.scss';

type PathBreadcrumbsProps = {
  items: BreadcrumbsProps['items'];
  isMobile?: boolean;
};

export function PathBreadcrumbs({ isMobile, items }: PathBreadcrumbsProps) {
  return (
    <Breadcrumbs
      items={items}
      className={styles.breadcrumbs}
      inactiveLastItem={items.length > 1}
      separator='/'
      size={isMobile ? 'xs' : 's'}
      data-test-id='header__breadcrumbs'
    />
  );
}
