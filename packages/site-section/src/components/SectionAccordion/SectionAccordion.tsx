import { RichText } from '@sbercloud/uikit-product-site-rich-text';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { AccordionPrimary } from '@snack-uikit/accordion';
import { Typography } from '@snack-uikit/typography';

import { SectionColor } from '../../types';
import { SectionBasic } from '../SectionBasic';
import styles from './styles.module.scss';
import { AccordionItem } from './types';
import { getBlockDescriptionSize, getBlockTitleProps } from './utils';

// Had to copy props to save proper typings
type AccordionPropsCopy =
  | {
      selectionMode: 'single';
      expandedDefault?: string;
      onExpandedChange?(value?: string): void;
    }
  | {
      selectionMode: 'multiple';
      expandedDefault?: string[];
      onExpandedChange?(value?: string[]): void;
    };

export type SectionAccordionProps = WithSupportProps<
  AccordionPropsCopy &
    WithLayoutType<{
      /** id секции */
      id?: string;
      /** Название секции */
      title: string;
      /** Массив айтемов */
      items: AccordionItem[];
      /** Цвет фона */
      backgroundColor?: SectionColor;
      /** Внешний бордер для блоков */
      outline?: boolean;
      /** CSS-класс */
      className?: string;
    }>
>;

export function SectionAccordion({
  id,
  title,
  items,
  selectionMode = 'multiple',
  layoutType,
  backgroundColor,
  outline,
  onExpandedChange,
  expandedDefault,
  className,
  ...rest
}: SectionAccordionProps) {
  return (
    <SectionBasic
      id={id}
      title={title}
      layoutType={layoutType}
      backgroundColor={backgroundColor}
      {...extractSupportProps(rest)}
    >
      {/* @ts-expect-error types mismatch because of union */}
      <AccordionPrimary
        selectionMode={selectionMode}
        expandedDefault={expandedDefault}
        onExpandedChange={onExpandedChange}
        className={styles.accordion}
      >
        {items.map(({ title, description }, index) => (
          <AccordionPrimary.CollapseBlock
            key={index}
            id={index.toString()}
            header={
              <Typography family='sans' {...getBlockTitleProps(layoutType)} className={styles.title}>
                <RichText richText={title} />
              </Typography>
            }
            className={className}
            removeContentFromDOM={false}
            outline={outline}
          >
            <Typography
              family='sans'
              purpose='body'
              tag='div'
              size={getBlockDescriptionSize(layoutType)}
              className={styles.description}
            >
              <RichText richText={description} />
            </Typography>
          </AccordionPrimary.CollapseBlock>
        ))}
      </AccordionPrimary>
    </SectionBasic>
  );
}
