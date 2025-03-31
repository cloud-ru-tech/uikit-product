import { RichText } from '@sbercloud/uikit-product-site-rich-text';
import { WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Typography, TypographyProps } from '@snack-uikit/typography';

import { BenefitItem, BenefitItemProps } from '../../helperComponents';
import { SectionBasic } from '../SectionBasic';
import styles from './styles.module.scss';
import { getTitleTypographyProps } from './utils';

type ItemProps = Omit<BenefitItemProps, 'layoutType'>;

export type SectionBenefitsBannerProps = WithSupportProps<
  WithLayoutType<{
    /** Заголовок */
    title?: string;
    /** Тэг заголовка */
    titleTag?: TypographyProps['tag'];
    /** Выгоды */
    items: ItemProps[];
    /** Фоновая картинка */
    backgroundImage: string;
    /** Описание под баннером */
    description?: string[] | string;
    /** CSS класс */
    className?: string;
  }>
>;

export function SectionBenefitsBanner({
  title,
  titleTag = 'h3',
  items,
  layoutType,
  backgroundImage,
  description,
  className,
  ...rest
}: SectionBenefitsBannerProps) {
  return (
    <SectionBasic layoutType={layoutType} className={className} {...rest}>
      <div className={styles.bannerWrapper} data-layout-type={layoutType}>
        <div className={styles.banner} data-layout-type={layoutType}>
          <img
            className={styles.illustration}
            src={backgroundImage}
            alt='benefits-illustration'
            data-layout-type={layoutType}
          />
          <div className={styles.contentWrapper}>
            {title && (
              <Typography family='light' tag={titleTag} {...getTitleTypographyProps(layoutType)}>
                <RichText richText={title} />
              </Typography>
            )}
            <div className={styles.benefitItems} data-layout-type={layoutType}>
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
