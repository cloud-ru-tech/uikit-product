import cn from 'classnames';

import { Grid, GridProps } from '@sbercloud/uikit-product-site-grid';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { CardSocial, CardSocialProps } from '../../helperComponents';
import { SectionColor } from '../../types';
import { SectionBasic, SectionBasicProps } from '../SectionBasic';
import { GRID_CONFIG } from './constants';
import styles from './styles.module.scss';

export type SectionSocialProps = WithSupportProps<
  WithLayoutType<
    Pick<SectionBasicProps, 'title' | 'subtitle' | 'titleAlign'> & {
      /** id секции */
      id?: string;
      /** CSS-класс */
      className?: string;
      /** Цвет фона */
      backgroundColor?: SectionColor;
      /** Заголовок */
      title?: string;

      /** Размер отступов сетки */
      gap?: GridProps['gap'];
      cards: Omit<CardSocialProps, 'layoutType'>[];
    }
  >
>;

export function SectionSocial({
  id,
  layoutType,
  title,
  subtitle,
  backgroundColor,
  className,
  cards,
  titleAlign,
  gap = 's',
  ...rest
}: SectionSocialProps) {
  return (
    <SectionBasic
      id={id}
      title={title}
      subtitle={subtitle}
      titleAlign={titleAlign}
      backgroundColor={backgroundColor}
      layoutType={layoutType}
      className={cn(className, styles.sectionSocial)}
      {...extractSupportProps(rest)}
    >
      <Grid columnsConfig={GRID_CONFIG} layoutType={layoutType} gap={gap}>
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
