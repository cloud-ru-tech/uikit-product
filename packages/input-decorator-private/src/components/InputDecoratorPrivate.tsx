import { ReactNode } from 'react';

import { TooltipProps } from '@sbercloud/uikit-react-tooltip';
import { WithSupportProps } from '@sbercloud/uikit-utils';

import { Footer } from '../helperComponents/Footer';
import { Header } from '../helperComponents/Header';

export type InputDecoratorPrivateProps = {
  children: ReactNode;
  error?: string;
  optional?: boolean;
  label?: string;
  labelTooltip?: Pick<TooltipProps, 'title' | 'content' | 'link' | 'icon' | 'iconAction'>;
  length?: {
    max: number;
    current: number;
  };
  hint?: string;
  className?: string;
};

export function InputDecoratorPrivate({
  className,
  children,
  length,
  label,
  labelTooltip,
  optional = false,
  error,
  hint,
  ...rest
}: WithSupportProps<InputDecoratorPrivateProps>) {
  return (
    <div className={className} {...rest}>
      <Header labelTooltip={labelTooltip} label={label} optional={optional} />
      {children}
      <Footer hint={hint} length={length} error={error} />
    </div>
  );
}
