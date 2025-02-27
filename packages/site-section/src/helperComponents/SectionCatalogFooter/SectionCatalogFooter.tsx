import { ChevronRightSVG } from '@sbercloud/uikit-product-icons';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { ButtonFunction, ButtonFunctionProps } from '@snack-uikit/button';

import styles from './styles.module.scss';

type FooterItem = {
  label: string;
  href?: string;
  onClick?: ButtonFunctionProps['onClick'];
};

export type SectionCatalogFooterProps = WithLayoutType<{
  items: FooterItem[];
}>;

export function SectionCatalogFooter({ items, layoutType }: SectionCatalogFooterProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className={styles.footer} data-layout-type={layoutType}>
      {items.map(({ label, onClick, href }) => (
        <ButtonFunction key={label} label={label} size='m' onClick={onClick} href={href} icon={<ChevronRightSVG />} />
      ))}
    </div>
  );
}
