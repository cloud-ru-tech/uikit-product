import { WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ModalCustomProps } from '@snack-uikit/modal';

import { NoteItemProps } from './helperComponents/NoteItem';

export type ReleaseNotesModalProps = WithLayoutType<
  Pick<ModalCustomProps, 'open' | 'onClose'> &
    WithSupportProps<{
      /** Массив новостей/заметок */
      items: NoteItemProps[];
      /** Состояние загрузки контента */
      loading?: boolean;
      /** Действие при клике по кнопке Ознакомиться позже */
      onReadLaterClick?(): void;
      /** Состояние ошибки получения данных */
      dataError?: boolean;
      /** Действие при клике по кнопке "Перезагрузить" на экране ошибки */
      onDataErrorRetryClick?(): void;
      /** Действие при переключении слайда */
      onSlideChange?(slide: number): void;
    }>
>;
