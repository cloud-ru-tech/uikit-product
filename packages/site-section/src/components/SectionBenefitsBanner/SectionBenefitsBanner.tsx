import cn from 'classnames';

import { RichText } from '@sbercloud/uikit-product-site-rich-text';
import { WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Typography, TypographyProps } from '@snack-uikit/typography';

import { BenefitItem, BenefitItemProps } from '../../helperComponents';
import { SectionBasic } from '../SectionBasic';
import styles from './styles.module.scss';
import { BackgroundType } from './types';
import { getTitleTypographyProps } from './utils';

type ItemProps = Omit<BenefitItemProps, 'layoutType'>;

export type SectionBenefitsBannerProps = WithSupportProps<
  WithLayoutType<
    {
      /** Заголовок */
      title?: string;
      /** Тэг заголовка */
      titleTag?: TypographyProps['tag'];
      /** Выгоды */
      items: ItemProps[];
      /** Описание под баннером */
      description?: string[] | string;
      /** CSS класс */
      className?: string;
    } & BackgroundType
  >
>;

export function SectionBenefitsBanner({
  title,
  titleTag = 'h3',
  items,
  layoutType,
  backgroundType = 'color',
  appearance = 'brand',
  color,
  backgroundImage,
  description,
  className,
  ...rest
}: SectionBenefitsBannerProps) {
  return (
    <SectionBasic layoutType={layoutType} className={className} {...rest}>
      <div className={styles.bannerWrapper} data-layout-type={layoutType}>
        <div
          className={cn(styles.banner, {
            [styles.white]: backgroundType && backgroundType === 'image',
          })}
          data-layout-type={layoutType}
          data-appearance={appearance}
          data-color={color}
        >
          {backgroundImage && (
            <img
              className={styles.illustration}
              src={backgroundImage}
              alt='benefits-illustration'
              data-layout-type={layoutType}
            />
          )}
          <div className={styles.contentWrapper}>
            {title && (
              <Typography family='light' tag={titleTag} {...getTitleTypographyProps(layoutType)}>
                <RichText richText={title} />
              </Typography>
            )}
            <div className={styles.benefitItems} data-items-amount={items.length} data-layout-type={layoutType}>
              {items.map(item => (
                <BenefitItem key={item.description} {...item} layoutType={layoutType} />
              ))}
            </div>
          </div>
        </div>
        {description && (
          <div className={styles.description} data-attribute='no_search_index'>
            <Typography family='sans' purpose='body' size='m' tag='div'>
              {Array.isArray(description) ? (
                description.map(item => <RichText key={item} richText={item} />)
              ) : (
                <RichText richText={description} />
              )}
            </Typography>
          </div>
        )}
      </div>
    </SectionBasic>
  );
}
