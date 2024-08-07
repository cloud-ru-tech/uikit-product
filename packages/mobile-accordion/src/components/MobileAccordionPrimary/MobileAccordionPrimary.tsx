import cn from 'classnames';

import { AccordionProps } from '@snack-uikit/accordion';

import { Accordion } from '../../helperComponents';
import styles from './styles.module.scss';

export function MobileAccordionPrimary({ className, ...rest }: AccordionProps) {
  return <Accordion className={cn(styles.accordionPrimary, className)} {...rest} />;
}
