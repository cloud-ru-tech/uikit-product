import { FC, useState } from 'react';

import { Button } from '@sbercloud/uikit-react-button';

import { ContentHiderStyled, ContentWrapperGradientStyled, ContentWrapperStyled } from './styled';

export type ContentHiderProps = {
  hideContentText: string;
  showContentText: string;
  displayedHeight: number;
  backgroundColor?: string;
  gradientClassName?: string;
};

export const ContentHider: FC<ContentHiderProps> = ({
  children,
  backgroundColor,
  gradientClassName,
  displayedHeight = 500,
  hideContentText = 'Свернуть',
  showContentText = 'Читать полностью',
}) => {
  const [showContent, setShowContent] = useState(false);

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
        {showContent ? hideContentText : showContentText}
      </Button>
    </div>
  );
};
