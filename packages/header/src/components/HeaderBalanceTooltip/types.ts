import { Mode } from './constants';

export type ModeEntry =
  | [Mode.Loading]
  | [Mode.RegularBalance, { balance: number }]
  | [Mode.LimitedBalance, { balance: number; limit: number }];
