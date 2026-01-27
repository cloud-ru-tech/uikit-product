import cn from 'classnames';

import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { AlertTop, AlertTopProps } from '@snack-uikit/alert';

import styles from './styles.module.scss';

type BannerInfo = {
  /** Цвет фона SubHeader */
  color: 'yellow' | 'blue' | 'green';
  /** Ссылка на текст SubHeader */
  link?: string;
  /** Текст SubHeader, может передаваться без ссылки */
  title: string;
};

const APPEARANCE_ALERT: Record<BannerInfo['color'], AlertTopProps['appearance']> = {
  green: 'success',
  yellow: 'warning',
  blue: 'info',
};

type SubHeaderProps = WithLayoutType<{
  /** Объект для отображения данных на баннере */
  bannerInfo: BannerInfo;
  /** Функция закрытия SubHeader */
  onCloseSubHeader?(): void;
}>;

export function SubHeader({ bannerInfo, onCloseSubHeader, layoutType }: SubHeaderProps) {
  return (
    <div className={cn(styles.root, styles[bannerInfo.color])} data-layout-type={layoutType}>
      <AlertTop
        className={styles.subHeaderContainer}
        title={!bannerInfo.link ? bannerInfo.title : undefined}
        link={
          bannerInfo.link
            ? {
                text: bannerInfo.title,
                href: bannerInfo.link,
              }
            : undefined
        }
        description=''
        icon={false}
        appearance={APPEARANCE_ALERT[bannerInfo.color]}
        onClose={onCloseSubHeader}
      />
    </div>
  );
}
