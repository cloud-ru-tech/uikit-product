import cn from 'classnames';

import { ButtonPromo } from '@cloud-ru/uikit-product-button-predefined';
import { RichText } from '@cloud-ru/uikit-product-site-rich-text';
import { Erid } from '@cloud-ru/uikit-product-site-tag';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { ButtonFilled } from '@snack-uikit/button';
import { Typography } from '@snack-uikit/typography';

import { HeroSlideMedia } from '../HeroSlideMedia';
import styles from './styles.module.scss';
import { HeroSlideProps } from './types';
import { getTitleProps } from './util';

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
  const hasButtonErid = Boolean(erid && erid.place === 'under-button');

  const buttonNode =
    appearance === 'brand' ? (
      <ButtonPromo {...button} size='l' className={styles.button} />
    ) : (
      <ButtonFilled {...button} size='l' appearance='primary' className={styles.button} />
    );

  return (
    <div
      id={id}
      data-layout-type={layoutType}
      data-appearance={appearance}
      data-color={color}
      className={cn(styles.wrapper, className)}
    >
      {erid && erid.place === 'tooltip' && <Erid className={styles.erid} tip={erid.tip} appearance='neutral' />}
      <div className={styles.slideContentWrapper} data-layout-type={layoutType}>
        <div className={styles.content}>
          <div className={styles.text} data-layout-type={layoutType}>
            <Typography family='sans' {...getTitleProps(layoutType)} tag='div'>
              <RichText richText={title} />
            </Typography>
            {description && (
              <Typography.SansBodyM className={styles.description} tag='div'>
                <RichText richText={description} />
              </Typography.SansBodyM>
            )}
          </div>

          <div className={styles.buttonWrapper} data-layout-type={layoutType} data-has-button-erid={hasButtonErid}>
            {buttonNode}
            {erid && hasButtonErid && (
              <Typography.LightLabelS className={styles.buttonErid} tag='div'>
                {erid.tip}
              </Typography.LightLabelS>
            )}
          </div>
        </div>

        <HeroSlideMedia {...media} layoutType={layoutType} />
      </div>
    </div>
  );
}
