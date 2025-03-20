import cn from 'classnames';
import { Fragment } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { Layout } from '@sbercloud/uikit-product-site-layout';
import { SiteNavbar, SiteNavbarProps } from '@sbercloud/uikit-product-site-navbar';
import { TagPredefined, TagPredefinedProps } from '@sbercloud/uikit-product-site-tag';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Breadcrumbs, BreadcrumbsProps } from '@snack-uikit/breadcrumbs';
import { ButtonFilled, ButtonFilledProps, ButtonOutline, ButtonOutlineProps } from '@snack-uikit/button';
import { Typography } from '@snack-uikit/typography';

import { PlatformLink, PlatformLinkProps } from '../../helperComponents';
import { HeroColor } from '../../types';
import styles from './styles.module.scss';
import { getTitleTypographyProps } from './utils';

export type HeroMainProps = WithSupportProps<
  WithLayoutType<{
    /** Заголовок продукта */
    title: string;
    /** Описание продукта */
    description: string;
    /** Ссылка на изображение */
    image: string;
    /** Хлебные крошки для продукта */
    breadcrumbs: BreadcrumbsProps['items'];
    /** Тэги */
    tags?: Pick<TagPredefinedProps, 'variant' | 'type'>[];
    /** Платформы */
    platforms?: Array<PlatformLinkProps['platform']>;
    /** Обработка клика по платформе */
    handlePlatformClick?: PlatformLinkProps['handlePlatformClick'];
    /** Цвета фона */
    backgroundColor?: HeroColor;
    /** Массив с настройками кнопок ButtonFilled */
    buttons?: [Omit<ButtonFilledProps, 'size' | 'appearance'>, Omit<ButtonOutlineProps, 'size' | 'appearance'>?];
    /** CSS - класснейм */
    className?: string;
    /** Navbar */
    navbar?: Pick<SiteNavbarProps, 'items' | 'active' | 'onItemClick' | 'topPosition'>;
  }>
>;

export function HeroMain({
  title,
  description,
  image,
  breadcrumbs,
  tags = [],
  platforms = [],
  handlePlatformClick,
  backgroundColor,
  buttons,
  navbar,
  layoutType,
  className,
  ...rest
}: HeroMainProps) {
  const { t } = useLocale('SiteHero');

  return (
    <>
      <Layout.SectionWrapper
        layoutType={layoutType}
        className={cn(className, styles.sectionWrapper)}
        data-section-background={backgroundColor}
      >
        <div className={styles.contentWrapper} {...extractSupportProps(rest)} data-layout-type={layoutType}>
          <div className={styles.content} data-layout-type={layoutType}>
            <div className={styles.left} data-layout-type={layoutType}>
              <div className={styles.leftContent} data-layout-type={layoutType}>
                <Breadcrumbs size='xs' items={breadcrumbs} data-test-id='hero-main__breadcrumbs' />

                {tags.length > 0 && (
                  <div className={styles.tagRow} data-layout-type={layoutType}>
                    {tags.map(({ variant, type }) => (
                      // eslint-disable-next-line
                      // @ts-ignore
                      <TagPredefined key={type} size='xs' variant={variant} type={type} />
                    ))}
                  </div>
                )}

                <div className={styles.textWrapper}>
                  <Typography tag='h1' family='sans' {...getTitleTypographyProps(layoutType)} className={styles.title}>
                    {title}
                  </Typography>

                  <Typography.SansBodyL className={styles.description}>{description}</Typography.SansBodyL>

                  {platforms && platforms.length > 0 && handlePlatformClick && (
                    <Typography.SansBodyL tag='p' className={styles.platforms}>
                      {t('Main.platforms')}:{' '}
                      {platforms.map((platform, index) => (
                        <Fragment key={platform}>
                          <PlatformLink key={platform} platform={platform} handlePlatformClick={handlePlatformClick} />
                          {platforms.length - 1 !== index && ', '}
                        </Fragment>
                      ))}
                    </Typography.SansBodyL>
                  )}
                </div>
              </div>

              {buttons && buttons.length > 0 && (
                <div className={styles.buttons} data-layout-type={layoutType}>
                  <ButtonFilled
                    className={styles.buttonPrimary}
                    {...buttons[0]}
                    data-layout-type={layoutType}
                    size='l'
                    appearance='primary'
                  />
                  {buttons.length > 1 && (
                    <ButtonOutline
                      className={styles.buttonOutline}
                      {...buttons[1]}
                      data-layout-type={layoutType}
                      size='l'
                      appearance='neutral'
                    />
                  )}
                </div>
              )}
            </div>

            <div className={styles.imageWrapper} data-layout-type={layoutType}>
              <img className={styles.image} alt='hero_img' src={image} data-layout-type={layoutType} />
            </div>
          </div>
        </div>
      </Layout.SectionWrapper>

      {navbar && navbar.items.length > 0 && (
        <Layout.SectionWrapper
          layoutType={layoutType}
          className={cn(styles.sectionWrapper, styles.navbarWrapper)}
          data-sticky={true}
          data-section-background={backgroundColor}
        >
          <SiteNavbar {...navbar} data-test-id='hero-main__navbar' />
        </Layout.SectionWrapper>
      )}
    </>
  );
}
