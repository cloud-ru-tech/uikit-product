import { useMemo, useState } from 'react';

import { Button } from '@sbercloud/uikit-react-button';
import { useLanguage } from '@sbercloud/uikit-utils';

import { Texts, textProvider } from '../helpers/texts-provider';
import { ContentHiderStyled, ContentWrapperGradientStyled, ContentWrapperStyled } from './styled';

export type ContentHiderProps = {
  hideContentText: string;
  showContentText: string;
  displayedHeight: number;
  backgroundColor?: string;
  gradientClassName?: string;
};

export const ContentHider: React.FC<ContentHiderProps> = ({
  children,
  backgroundColor,
  gradientClassName,
  displayedHeight = 500,
  hideContentText,
  showContentText,
}) => {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const [showContent, setShowContent] = useState(false);

  const hideText = useMemo(
    () => hideContentText || textProvider(languageCode, Texts.Hide),
    [languageCode, hideContentText],
  );
  const showText = useMemo(
    () => showContentText || textProvider(languageCode, Texts.Show),
    [languageCode, showContentText],
  );

  return (
    <div>
      <ContentHiderStyled showContent={showContent} displayedHeight={displayedHeight}>
        <ContentWrapperStyled>{children}</ContentWrapperStyled>
        <ContentWrapperGradientStyled
          showContent={showContent}
          className={gradientClassName}
          backgroundColor={backgroundColor}
        />
      </ContentHiderStyled>
      <Button
        variant={Button.variants.Outline}
        onClick={() => setShowContent(showContent => !showContent)}
        text={showContent ? hideText : showText}
      />
    </div>
  );
};
