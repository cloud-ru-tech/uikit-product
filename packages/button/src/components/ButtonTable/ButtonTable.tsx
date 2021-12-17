import { cx } from '@linaria/core';
import { ReactText } from 'react';

import { CirclePlayFilledInterfaceSVG } from '@sbercloud/uikit-react-icons';

import { BaseButton, LoadingIcon, PieIndicator } from '../../helperComponents';
import { extractCommonButtonProps } from '../../helpers';
import { withManagedLoading, withTooltip } from '../../hocs';
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

const ButtonTableBase = ({
  text,
  variant = Variant.Fill,
  loading,
  loadingText,
  progress,
  getProgressText,
  disabled,
  className,
  ...rest
}: ButtonTableProps) => {
  const isProgress = typeof progress === 'number';
  const hasGetProgressText = typeof getProgressText === 'function';
  return (
    <BaseButton
      className={cx(S.buttonTableClassName, className)}
      data-variant={variant}
      data-loading={loading || (loading && isProgress) || undefined}
      disabled={disabled || loading}
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
    </BaseButton>
  );
};

const ButtonTableWithTooltip = withTooltip(ButtonTableBase);

export const ButtonTable = ButtonTableWithTooltip as typeof ButtonTableWithTooltip & {
  variants: typeof Variant;
};

ButtonTable.variants = Variant;

export const ButtonTableManagedLoading = withManagedLoading(ButtonTable);
