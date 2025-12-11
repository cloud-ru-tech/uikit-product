import cn from 'classnames';

import { Layout } from '@sbercloud/uikit-product-site-layout';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Breadcrumbs, BreadcrumbsProps } from '@snack-uikit/breadcrumbs';
import { PromoTag, PromoTagProps } from '@snack-uikit/promo-tag';

import { HERO_COLORS } from '../../constants';
import { HeroButtonProps, HeroEventButton, Place, PlaceProps } from '../../helperComponents';
import { HeroColor } from '../../types';
import { AUDIENCE_LABELS, FORMAT_LABELS } from './constants';
import styles from './styles.module.scss';
import { Audience, Format } from './types';

export type HeroEventProps = WithSupportProps<{
  /** CSS - класснейм */
  className?: string;
  /** Заголовок события */
  title: string;
  /** Начало события события */
  startsAt: string;
  /** Место проведения события */
  place: Omit<PlaceProps, 'title'> & { title?: PlaceProps['title'] };
  /** Ссылка на изображение */
  image: string;
  /** Цвета фона */
  backgroundColor?: HeroColor;
  /** Категория события */
  category?: PromoTagProps;
  /** Формат проведения события */
  format?: Format;
  /** Аудитория, для которой проводится событие */
  audience?: Audience;
  /** Хлебные крошки для события */
  breadcrumbs: BreadcrumbsProps['items'];
  /** Настройки кнопки */
  button: HeroButtonProps;
}> &
  WithLayoutType;

export function HeroEvent({
  className,
  title,
  breadcrumbs,
  backgroundColor = HERO_COLORS.NeutralBackground,
  category,
  format,
  audience,
  startsAt,
  place,
  image,
  button,
  layoutType,
  ...rest
}: HeroEventProps) {
  const formatTitle = format ? FORMAT_LABELS[format] : undefined;
  const audienceTitle = audience ? AUDIENCE_LABELS[audience] : undefined;
  const showTagRow = Boolean(category || formatTitle || audienceTitle);

  return (
    <Layout.SectionWrapper
      layoutType={layoutType}
      className={cn(className, styles.sectionWrapper)}
      data-section-background={backgroundColor}
    >
      <section className={styles.wrapper} data-layout-type={layoutType} {...extractSupportProps(rest)}>
        <div className={styles.heroEvent} data-layout-type={layoutType}>
          <Breadcrumbs size='xs' items={breadcrumbs} data-test-id='hero-event__breadcrumbs' />

          <div className={styles.content} data-layout-type={layoutType}>
            <div className={styles.left} data-layout-type={layoutType}>
              <div className={styles.titleWrapper} data-layout-type={layoutType}>
                {showTagRow && (
                  <div className={styles.tagRow}>
                    {category && <PromoTag {...category} color='decor' size='xs' className={styles.promoTag} />}
                    {formatTitle && (
                      <PromoTag
                        appearance='violet'
                        text={formatTitle}
                        color='decor'
                        size='xs'
                        className={styles.promoTag}
                      />
                    )}
                    {audienceTitle && (
                      <PromoTag
                        appearance='violet'
                        text={audienceTitle}
                        color='decor'
                        size='xs'
                        className={styles.promoTag}
                      />
                    )}
                  </div>
                )}

                <div className={styles.textWrapper} data-layout-type={layoutType}>
                  <h1 className={styles.title} data-layout-type={layoutType}>
                    {title}
                  </h1>

                  <p className={styles.coords} data-color={backgroundColor}>
                    <time className={styles.time}>
                      {startsAt}
                      {place.title && ', '}
                    </time>

                    {place.title && <Place {...place} title={place.title} />}
                  </p>
                </div>
              </div>

              <HeroEventButton {...button} layoutType={layoutType} className={styles.button} />
            </div>

            <div className={styles.imageWrapper} data-layout-type={layoutType}>
              <img className={styles.image} alt='hero_img' src={image} data-layout-type={layoutType} />
            </div>
          </div>
        </div>
      </section>
    </Layout.SectionWrapper>
  );
}
