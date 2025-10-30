import { ReactNode } from 'react';

import { TitleClickableProps } from '@sbercloud/uikit-product-title-clickable';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import type { InfoBlockProps } from '@snack-uikit/info-block';
import { WithSupportProps } from '@snack-uikit/utils';

import { Action } from '../../helperComponents/Actions/types';

export type WidgetState = 'default' | 'loading' | 'error';

export type WidgetHeaderProps = Pick<
  TitleClickableProps,
  'title' | 'icon' | 'avatar' | 'href' | 'target' | 'onClick' | 'titleTag' | 'fullWidth' | 'children' | 'className'
>;

export type WidgetLoadingStateProps = {
  loadingContent?: ReactNode;
  showSkeleton?: boolean;
};

export type WidgetErrorStateProps = {
  errorTitle?: string;
  errorDescription?: string;
  errorIcon?: InfoBlockProps['icon'];
};

export type WidgetProps = WithLayoutType<
  WithSupportProps<{
    header: WidgetHeaderProps;
    children: ReactNode;
    actions?: Action[];
    wide?: boolean;
    state?: WidgetState;
    loadingState?: WidgetLoadingStateProps;
    errorState?: WidgetErrorStateProps;
    className?: string;
  }>
>;
