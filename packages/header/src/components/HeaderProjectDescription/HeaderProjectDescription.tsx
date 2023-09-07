import { TruncateString } from '@sbercloud/uikit-product-truncate-string';

import * as S from './styled';

export type HeaderProjectDescriptionProps = {
  label: string;
};

export function HeaderProjectDescription({ label }: HeaderProjectDescriptionProps) {
  return (
    <S.Description data-test-id='header-project-description'>
      <TruncateString placement={TruncateString.placements.Bottom} text={label} className={S.descriptionClassName} />
    </S.Description>
  );
}
