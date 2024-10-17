import { MouseEventHandler, ReactNode } from 'react';

import { LinkProps } from '@snack-uikit/link';
import { PromoTagProps } from '@snack-uikit/promo-tag';

export type Currency = 'ruble';

import { GrantProps } from './components/PopoverContent/components/Grant';

export type FinanceInfoRowType = {
  value: number | string;
  tip?: ReactNode;
  label: string;
  description?: string;
  onAddClick(): void;
  status?: 'default' | 'attention';
  tipMoreButtonLink?: string;
  onOpenChange?(isOpen: boolean): void;
};

export type PopoverContentProps = {
  loading?: boolean;
  onClose(): void;
  tag?: Pick<PromoTagProps, 'text' | 'appearance'>;
  link: Required<Pick<LinkProps, 'onClick' | 'href'>>;
  agreement?: string;
  balance: FinanceInfoRowType;
  bonuses: FinanceInfoRowType;
  eyeButton: {
    dataVisible: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
  };
  bonusGrants?: GrantProps[];
};
