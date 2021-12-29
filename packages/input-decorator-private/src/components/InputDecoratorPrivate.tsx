import { ReactNode } from 'react';

import { TooltipProps } from '@sbercloud/uikit-react-tooltip';
import { WithSupportProps } from '@sbercloud/uikit-utils';

import { Footer } from '../helperComponents/Footer';
import { Header } from '../helperComponents/Header';
import * as S from './styled';

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
      <S.FromWrapper
        data-has-header={label || optional || undefined}
        data-has-footer={error || hint || length || undefined}
      >
        {children}
      </S.FromWrapper>
      <Footer hint={hint} length={length} error={error} />
    </div>
  );
}
