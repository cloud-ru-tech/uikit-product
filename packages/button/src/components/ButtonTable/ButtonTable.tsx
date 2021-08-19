import { ReactText, forwardRef } from 'react';

import { CirclePlayFilledInterfaceSVG } from '@sbercloud/uikit-react-icons';

import { LoadingIcon, PieIndicator } from '../../helperComponents';
import { extractCommonButtonProps } from '../../helpers';
import { withManagedLoading } from '../../hocs';
import { CommonButtonProps } from '../../types';
import { Variant } from './constants';
import * as S from './styled';

export type ButtonTableProps = CommonButtonProps & {
  text: ReactText;
  variant?: Variant;
  loading?: boolean;
  loadingText?: string;
  progress?: number;
  getProgressText?: (progress: number) => string;
};

const ButtonTableBase = forwardRef<HTMLButtonElement, ButtonTableProps>(
  ({ text, variant = Variant.Fill, loading, loadingText, progress, getProgressText, disabled, ...rest }, ref) => {
    const isProgress = typeof progress === 'number';
    const hasGetProgressText = typeof getProgressText === 'function';
    return (
      <S.Button
        data-variant={variant}
        data-loading={loading || (loading && isProgress) || undefined}
        disabled={disabled || loading}
        ref={ref}
        {...extractCommonButtonProps(rest)}
      >
        {loading && (!isProgress || !hasGetProgressText) && (loadingText || text)}
        {loading &&
          typeof progress === 'number' &&
          typeof getProgressText === 'function' &&
          (getProgressText(progress) || loadingText || text)}
        {!loading && text}

        <S.IconWrapper>
          {loading && !isProgress && <LoadingIcon />}
          {loading && typeof progress === 'number' && <PieIndicator completed={progress} />}
          {!loading && <CirclePlayFilledInterfaceSVG />}
        </S.IconWrapper>
      </S.Button>
    );
  },
);

export const ButtonTable = ButtonTableBase as typeof ButtonTableBase & {
  variants: typeof Variant;
};

ButtonTable.variants = Variant;

export const ButtonTableManagedLoading = withManagedLoading(ButtonTable);
