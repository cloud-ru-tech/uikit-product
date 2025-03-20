import cn from 'classnames';

import { Grid } from '@sbercloud/uikit-product-site-grid';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { CardSocial, CardSocialProps } from '../../helperComponents';
import { SectionColor } from '../../types';
import { SectionBasic, SectionBasicProps } from '../SectionBasic';
import { GRID_CONFIG } from './constants';
import styles from './styles.module.scss';

export type SectionSocialProps = WithSupportProps<
  WithLayoutType<
    Pick<SectionBasicProps, 'title' | 'titleAlign'> & {
      /** id секции */
      id?: string;
      /** CSS-класс */
      className?: string;
      /** Цвет фона */
      backgroundColor?: SectionColor;
      /** Заголовок */
      title?: string;
      cards: Omit<CardSocialProps, 'layoutType'>[];
    }
  >
>;

export function SectionSocial({
  id,
  layoutType,
  title,
  backgroundColor,
  className,
  cards,
  titleAlign,
  ...rest
}: SectionSocialProps) {
  return (
    <SectionBasic
      id={id}
      title={title}
      titleAlign={titleAlign}
      backgroundColor={backgroundColor}
      layoutType={layoutType}
      className={cn(className, styles.sectionSocial)}
      {...extractSupportProps(rest)}
    >
      <Grid columnsConfig={GRID_CONFIG} layoutType={layoutType} gap='s'>
        {cards.map((card, index) => (
          <CardSocial
            {...card}
            key={card.title}
            layoutType={layoutType}
            data-test-id={card['data-test-id'] ?? `section-social__card-${index}`}
          />
        ))}
      </Grid>
    </SectionBasic>
  );
}
