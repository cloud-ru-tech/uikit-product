import { ButtonHTMLAttributes } from 'react';

import * as S from './styled';

export function ActionButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <S.Button type='button' {...props} />;
}
