import cn from 'classnames';

import { ButtonPromo } from '@sbercloud/uikit-product-button-predefined';
import { Layout } from '@sbercloud/uikit-product-site-layout';
import { RichText } from '@sbercloud/uikit-product-site-rich-text';
import { Erid } from '@sbercloud/uikit-product-site-tag';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import { HeroSlideMedia } from '../HeroSlideMedia';
import styles from './styles.module.scss';
import { HeroSlideProps } from './types';
import { getSliderContentWrapperImageType, getTitleProps } from './util';

type Props = WithLayoutType<HeroSlideProps>;

export function HeroSlide({
  layoutType,
  id,
  title,
  description,
  media,
  button,
  color,
  appearance,
  erid,
  className,
}: Props) {
  return (
    <div
      id={id}
      data-layout-type={layoutType}
      data-appearance={appearance}
      data-color={color}
      className={cn(styles.wrapper, className)}
    >
      <Layout.SectionWrapper layoutType={layoutType} className={styles.sectionWrapper}>
        {erid && <Erid className={styles.erid} tip={erid.tip} appearance={erid.appearance} />}
        <div
          className={styles.slideContentWrapper}
          data-layout-type={layoutType}
          data-image-format={getSliderContentWrapperImageType(media)}
        >
          <div
            className={styles.content}
            data-layout-type={layoutType}
            data-image-format={getSliderContentWrapperImageType(media)}
          >
            <div className={styles.text} data-layout-type={layoutType}>
              <Typography family='sans' {...getTitleProps(layoutType)} tag='div'>
                <RichText richText={title} />
              </Typography>
              {description && (
                <Typography.SansBodyL tag='div'>
                  <RichText richText={description} />
                </Typography.SansBodyL>
              )}
            </div>

            <div className={styles.buttonWrapper} data-layout-type={layoutType}>
              <ButtonPromo target='_self' {...button} size='l' appearance='tertiary' className={styles.button} />
            </div>
          </div>

          <HeroSlideMedia {...media} layoutType={layoutType} />
        </div>
      </Layout.SectionWrapper>
    </div>
  );
}
