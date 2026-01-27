import cn from 'classnames';

import { extractSupportProps, WithLayoutType, WithSupportProps } from '@cloud-ru/uikit-product-utils';

import { PromoList, PromoListProps } from '../../helperComponents';
import { SectionBasic } from '../SectionBasic';
import styles from './styles.module.scss';

export type SectionPromoListProps = WithSupportProps<
  WithLayoutType<{
    /** id секции */
    id?: string;
    /** CSS-класс */
    className?: string;
    /** Заголовок */
    title: string;
    /** Описание */
    description?: string;
    /** Ссылка на изображение */
    image: string;
    /** Элементы левого списка */
    leftList: PromoListProps;
    /** Элементы правого списка */
    rightList: PromoListProps;
  }>
>;

export function SectionPromoList({
  id,
  layoutType,
  className,
  title,
  description,
  image,
  leftList,
  rightList,
  ...rest
}: SectionPromoListProps) {
  return (
    <SectionBasic
      id={id}
      title={title}
      description={description}
      backgroundColor='neutral-background1-level'
      layoutType={layoutType}
      className={cn(className, styles.sectionPromoList)}
      {...extractSupportProps(rest)}
    >
      <div className={styles.cards} data-layout-type={layoutType}>
        <div className={styles.left} data-test-id='promo-list__card'>
          <PromoList {...leftList} layoutType={layoutType} />
        </div>
        <div
          className={styles.right}
          data-layout-type={layoutType}
          data-test-id='promo-list__card'
          style={{ '--image': `url(${image})` }}
        >
          <div className={styles.rightSectionText} data-layout-type={layoutType}>
            <PromoList {...rightList} layoutType={layoutType} />
          </div>
        </div>
      </div>
    </SectionBasic>
  );
}
