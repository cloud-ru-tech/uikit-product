import { ValueOf } from '@snack-uikit/utils';

import { MODAL_MODE, MODE, POSITION, SIZE } from './constants';

export type Size = ValueOf<typeof SIZE>;

export type Mode = ValueOf<typeof MODE>;

export type ModalMode = ValueOf<typeof MODAL_MODE>;

export type Position = ValueOf<typeof POSITION>;
