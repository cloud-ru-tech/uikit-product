import { MouseEventHandler } from 'react';

import { BannerPrimary } from '@sbercloud/uikit-product-site-banner';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';

export type FreeCoursesAndCertificationProps = WithLayoutType<{
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}>;

export function FreeCoursesAndCertification({ href, onClick, layoutType }: FreeCoursesAndCertificationProps) {
  return (
    <BannerPrimary
      title='Бесплатные курсы и сертификации'
      description='Познакомьтесь с сервисами облачных платформ Cloud.ru на бесплатных курсах. Выберите курс, пройдите сертификацию и подтвердите свои знания облачных технологий'
      img='https://cdn.cloud.ru/backend/images/education/banners/free_courses_and_certification.webp'
      imgType='rectangle'
      appearance='decor'
      color='blue'
      layoutType={layoutType}
      buttons={[
        {
          label: 'Подробнее',
          href: href,
          onClick: onClick,
        },
      ]}
    />
  );
}
