import cn from 'classnames';
import { Fragment } from 'react';

import { ButtonPromoOutline, ButtonPromoOutlineProps } from '@sbercloud/uikit-product-button-predefined';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { Layout } from '@sbercloud/uikit-product-site-layout';
import { SiteNavbar, SiteNavbarProps } from '@sbercloud/uikit-product-site-navbar';
import { RichText } from '@sbercloud/uikit-product-site-rich-text';
import { TagSpecial, TagSpecialProps } from '@sbercloud/uikit-product-site-tag';
import { SiteVideo, SiteVideoProps } from '@sbercloud/uikit-product-site-video';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Breadcrumbs, BreadcrumbsProps } from '@snack-uikit/breadcrumbs';
import { ButtonFilled, ButtonFilledProps } from '@snack-uikit/button';
import { Typography } from '@snack-uikit/typography';

import { HeroColor } from '../../types';
import { PlatformLink, PlatformLinkProps } from './components';
import styles from './styles.module.scss';
import { getTitleTypographyProps } from './utils';

export type HeroMainProps = WithSupportProps<
  WithLayoutType<{
    /** Заголовок продукта */
    title: string;
    /** Описание продукта */
    description: string;
    /** Ссылка на изображение */
    image?: string;
    /** Видео */
    video?: SiteVideoProps['video'];
    /** Хлебные крошки для продукта */
    breadcrumbs: BreadcrumbsProps['items'];
    /** Тэги */
    tags?: Pick<TagSpecialProps, 'text' | 'appearance' | 'tip'>[];
    /** Платформы */
    platforms?: Array<PlatformLinkProps['platform']>;
    /** Обработка клика по платформе */
    handlePlatformClick?: PlatformLinkProps['handlePlatformClick'];
    /** Цвета фона */
    backgroundColor?: HeroColor;
    /** Массив с настройками кнопок ButtonFilled */
    buttons?: [Omit<ButtonFilledProps, 'size' | 'appearance'>, Omit<ButtonPromoOutlineProps, 'size' | 'appearance'>?];
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
  video,
  breadcrumbs,
  tags = [],
  platforms = [],
  handlePlatformClick,
  backgroundColor = 'neutral-background1-level',
  buttons,
  navbar,
  layoutType,
  className,
  ...rest
}: HeroMainProps) {
  const { t } = useLocale('SiteHero');

  const isAdaptive = ['mobile', 'tablet'].includes(layoutType);

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
                    {tags.map(({ text, tip, appearance }) => (
                      <TagSpecial key={text} text={text} tip={tip} appearance={appearance} />
                    ))}
                  </div>
                )}

                <div className={styles.textWrapper}>
                  <Typography tag='h1' family='sans' {...getTitleTypographyProps(layoutType)} className={styles.title}>
                    <RichText richText={title} />
                  </Typography>

                  <Typography.SansBodyL tag='div' className={styles.description}>
                    <RichText richText={description} />
                  </Typography.SansBodyL>

                  {platforms && platforms.length > 0 && handlePlatformClick && (
                    <Typography.SansBodyL tag='p' className={styles.platforms}>
                      {t('Main.platforms')}:{' '}
                      {platforms.map((platform, index) => (
                        <Fragment key={platform.id || platform.title}>
                          <PlatformLink platform={platform} handlePlatformClick={handlePlatformClick} />
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
                    {...buttons[0]}
                    data-layout-type={layoutType}
                    size='l'
                    appearance='primary'
                    fullWidth={isAdaptive}
                  />
                  {buttons.length > 1 && (
                    <ButtonPromoOutline
                      {...buttons[1]}
                      data-layout-type={layoutType}
                      size='l'
                      appearance='secondary'
                      fullWidth={isAdaptive}
                    />
                  )}
                </div>
              )}
            </div>

            <div className={styles.imageWrapper} data-layout-type={layoutType}>
              <div className={styles.media} data-layout-type={layoutType}>
                {image && <img alt='hero_img' src={image} />}

                {!image && video && <SiteVideo className={styles.video} video={video} />}
              </div>
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
