import { Texts } from '../../helpers';

export enum Variant {
  Pause = 'pause',
  Stop = 'stop',
  Refresh = 'refresh',
  Play = 'play',
  View = 'view',
}

export const TEXTS_BY_VARIANT = {
  [Variant.Pause]: Texts.Pause,
  [Variant.Stop]: Texts.Stop,
  [Variant.Refresh]: Texts.Refresh,
  [Variant.Play]: Texts.Play,
  [Variant.View]: Texts.View,
};
