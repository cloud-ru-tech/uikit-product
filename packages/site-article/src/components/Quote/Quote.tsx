import { useMemo } from 'react';

import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Typography, TypographyProps } from '@snack-uikit/typography';

import { ArticleTypography } from '../ArticleTypography';
import { QuotesSVG } from './QuotesSVG';
import styles from './styles.module.scss';

export type QuoteProps = WithLayoutType<{
  text: string;
  image?: string;
  name?: string;
  position?: string;
}>;

export function Quote(props: QuoteProps) {
  const { text, image, name, position, layoutType } = props;

  const typographyProps: TypographyProps = useMemo(() => {
    if (layoutType === 'mobile') {
      return {
        family: 'sans',
        purpose: 'body',
        size: 'm',
      };
    }

    return {
      family: 'sans',
      purpose: 'body',
      size: 'l',
    };
  }, [layoutType]);

  return (
    <div className={styles.quote} data-layout-type={layoutType} data-test-id='quote'>
      <div className={styles.iconWrapper} data-layout-type={layoutType}>
        <QuotesSVG className={styles.icon} />
      </div>
      <div className={styles.wrapper}>
        <ArticleTypography className={styles.text} layoutType={layoutType} tag='p' type='body'>
          {text}
        </ArticleTypography>
        <div className={styles.author} data-layout-type={layoutType}>
          {image && <img className={styles.authorImage} src={image} alt='Фото автора цитаты' />}
          <div className={styles.authorNameWrapper}>
            {name && (
              <ArticleTypography className={styles.authorName} layoutType={layoutType} tag='span' type='bodyBold'>
                {name}
              </ArticleTypography>
            )}
            {position && (
              <Typography {...typographyProps} className={styles.authorPosition}>
                {position}
              </Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
