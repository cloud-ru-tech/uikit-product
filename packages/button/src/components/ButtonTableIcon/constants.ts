import { Texts } from '../../helpers';

export enum Variant {
  Pause = 'pause',
  Stop = 'stop',
  Refresh = 'refresh',
  Play = 'play',
  View = 'view',
}

export const TEXTS_BY_VARIANT = {
  [Variant.Pause]: Texts.pause,
  [Variant.Stop]: Texts.stop,
  [Variant.Refresh]: Texts.refresh,
  [Variant.Play]: Texts.play,
  [Variant.View]: Texts.view,
};
