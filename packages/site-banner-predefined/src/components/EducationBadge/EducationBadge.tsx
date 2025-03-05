import { MouseEventHandler } from 'react';

import { BannerPrimary } from '@sbercloud/uikit-product-site-banner';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';

export type EducationBadgeProps = WithLayoutType<{
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}>;

export function EducationBadge({ href, onClick, layoutType }: EducationBadgeProps) {
  return (
    <BannerPrimary
      title='Цифровой бейдж'
      description='Подтверждает знания облачных технологий и инфраструктуры. Чтобы получить его, пройдите сертификацию'
      img='https://cdn.cloud.ru/backend/images/education/banners/education_badge.webp'
      imgType='rectangle'
      appearance='decor'
      color='neutral'
      layoutType={layoutType}
      buttons={[
        {
          label: 'Пройти сертификацию',
          href: href,
          onClick: onClick,
        },
      ]}
    />
  );
}
