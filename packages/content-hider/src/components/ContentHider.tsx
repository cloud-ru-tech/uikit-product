import { Button } from '@sbercloud/uikit-react-button';
import { useLanguage } from '@sbercloud/uikit-react-localization';
import { useMemo, useState } from 'react';

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
  const language = useLanguage({ onlyEnabledLanguage: true });
  const [showContent, setShowContent] = useState(false);

  const hideText = useMemo(() => hideContentText || textProvider(language, Texts.hide), [language, hideContentText]);
  const showText = useMemo(() => showContentText || textProvider(language, Texts.show), [language, showContentText]);

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
        size={Button.sizes.m}
        variant={Button.variants.Outlined}
        onClick={() => setShowContent(showContent => !showContent)}
      >
        {showContent ? hideText : showText}
      </Button>
    </div>
  );
};
