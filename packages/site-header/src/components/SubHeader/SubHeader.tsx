import cn from 'classnames';

import { MobileAlertTop } from '@cloud-ru/uikit-product-mobile-alert';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { AlertTop, AlertTopProps } from '@snack-uikit/alert';
import { Link } from '@snack-uikit/link';

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
  const isDesktop = layoutType === 'desktop' || layoutType === 'desktopSmall';

  const AlertComponent = isDesktop ? AlertTop : MobileAlertTop;

  const description = bannerInfo.link ? (
    <Link
      href={bannerInfo.link}
      text={bannerInfo.title}
      size='m'
      appearance={bannerInfo.color}
      textMode='on-accent'
      insideText
    />
  ) : (
    bannerInfo.title
  );

  return (
    <div className={cn(styles.root)} data-color={bannerInfo.color} data-layout-type={layoutType}>
      <AlertComponent
        className={cn({ [styles.subHeaderContainer]: isDesktop })}
        description={description}
        icon={false}
        appearance={APPEARANCE_ALERT[bannerInfo.color]}
        onClose={onCloseSubHeader}
      />
    </div>
  );
}
