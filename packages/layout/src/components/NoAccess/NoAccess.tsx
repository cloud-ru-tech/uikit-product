import { LockInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { PredefinedDecorIconPrivate } from '@sbercloud/uikit-product-predefined-icons-private';
import { extractSupportProps, useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../helpers/texts-provider';
import * as S from './styled';

export type NoAccessProps = WithSupportProps<{
  serviceName?: string;
  className?: string;
}>;

export function NoAccess({ serviceName, className, ...rest }: NoAccessProps) {
  const { languageCode } = useLanguage();

  return (
    <S.Wrapper {...extractSupportProps(rest)} className={className}>
      {serviceName && <S.ServiceName>{serviceName}</S.ServiceName>}
      <S.BaseBlock>
        <S.Content>
          <PredefinedDecorIconPrivate type={PredefinedDecorIconPrivate.types.Custom} icon={<LockInterfaceSVG />} />
          <S.H5Heading>{textProvider(languageCode, Texts.NoAccessTitle)}</S.H5Heading>
          <S.Description>
            <S.Text>{textProvider(languageCode, Texts.NoAccessSubtitle)}</S.Text>
            <S.Text>{textProvider(languageCode, Texts.NoAccessText)}</S.Text>
          </S.Description>
        </S.Content>
      </S.BaseBlock>
    </S.Wrapper>
  );
}
