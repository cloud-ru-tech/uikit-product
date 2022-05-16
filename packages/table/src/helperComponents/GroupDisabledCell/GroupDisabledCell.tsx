import { RadioCheckedInterfaceSVG } from '@sbercloud/uikit-product-icons';

import * as S from './styled';

export function GroupDisabledCell({ value, data }: { value: string; data: { disabled: boolean } }) {
  const { disabled } = data;

  if (!disabled) {
    return <div>{value}</div>;
  }

  return (
    <S.CellBox>
      <RadioCheckedInterfaceSVG className={S.radioCheckedClassName} />
      {value}
    </S.CellBox>
  );
}
