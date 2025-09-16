import { ReactNode } from 'react';

import { FieldSelectMultipleProps, FieldSelectSingleProps } from '@sbercloud/uikit-product-mobile-fields';
import { AdaptiveDrawerProps, AdaptiveModalProps } from '@sbercloud/uikit-product-mobile-modal';

type CommonModalDrawerProps = 'open' | 'onClose' | 'approveButton' | 'cancelButton';
type CreateLayoutModalProps = Omit<AdaptiveModalProps, CommonModalDrawerProps> & { content: ReactNode };
type CreateLayoutDrawerProps = Omit<AdaptiveDrawerProps, CommonModalDrawerProps>;

export type LayoutProps =
  | {
      /** По клику на кнопку создания открывать модальное окно или дровер */
      createLayoutType: 'modal';
      /** Пропсы передаваемые в модалку или дровер создания новой опции */
      createLayoutProps: CreateLayoutModalProps;
    }
  | {
      createLayoutType: 'drawer';
      createLayoutProps: CreateLayoutDrawerProps;
    };

export type EntityName = {
  plural: string;
  single: string;
};

export type OmittedSelectProps = 'footer' | 'noResultState' | 'noDataState' | 'errorDataState';

export type FieldSelectProps =
  | (Omit<FieldSelectSingleProps, OmittedSelectProps> & {
      selection?: 'single';
    })
  | (Omit<FieldSelectMultipleProps, OmittedSelectProps> & {
      selection: 'multiple';
    });
