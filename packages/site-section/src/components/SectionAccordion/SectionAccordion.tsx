import { RichText } from '@sbercloud/uikit-product-site-rich-text';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { AccordionPrimary, AccordionProps, AccordionSecondary } from '@snack-uikit/accordion';
import { Typography } from '@snack-uikit/typography';

import { SectionColor } from '../../types';
import { SectionBasic } from '../SectionBasic';
import styles from './styles.module.scss';
import { AccordionItem } from './types';
import { getBlockTitleProps } from './utils';

export type SectionAccordionProps = WithSupportProps<
  WithLayoutType<{
    /** Название секции */
    title: string;
    /** Массив айтемов */
    items: AccordionItem[];
    /** Режим работы аккордиона */
    selectionMode?: AccordionProps['selectionMode'];
    /** Цвет фона */
    backgroundColor?: SectionColor;
    /** Внешний бордер для блоков */
    outline?: boolean;

    /** CSS-класс */
    className?: string;
  }>
>;

export function SectionAccordion({
  title,
  items,
  selectionMode,
  layoutType,
  backgroundColor,
  outline,
  className,
  ...rest
}: SectionAccordionProps) {
  return (
    <SectionBasic
      title={title}
      layoutType={layoutType}
      backgroundColor={backgroundColor}
      {...extractSupportProps(rest)}
    >
      <AccordionSecondary selectionMode={selectionMode} className={styles.accordion}>
        {items.map(({ title, description }, index) => (
          <AccordionPrimary.CollapseBlock
            key={index}
            id={index.toString()}
            header={
              <Typography family='sans' {...getBlockTitleProps(layoutType)}>
                {title}
              </Typography>
            }
            className={className}
            removeContentFromDOM={false}
            outline={outline}
          >
            <Typography.SansBodyM>
              <RichText richText={description} />
            </Typography.SansBodyM>
          </AccordionPrimary.CollapseBlock>
        ))}
      </AccordionSecondary>
    </SectionBasic>
  );
}
