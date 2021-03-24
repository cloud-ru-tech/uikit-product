import { FC, useState } from 'react';

import { Button } from 'components/Button';

import {
  ContentHiderStyled,
  ContentWrapperStyled,
  ContentWrapperGradientStyled,
} from './styled';

export interface IContentHiderProps {
  hideContentText: string;
  showContentText: string;
  displayedHeight: number;
  backgroundColor?: string;
}

export const ContentHider: FC<IContentHiderProps> = ({
  children,
  backgroundColor,
  displayedHeight = 500,
  hideContentText = 'Свернуть',
  showContentText = 'Читать полностью',
}) => {
  const [showContent, setShowContent] = useState(false);

  return (
    <div>
      <ContentHiderStyled
        showContent={showContent}
        displayedHeight={displayedHeight}
      >
        <ContentWrapperStyled>{children}</ContentWrapperStyled>
        <ContentWrapperGradientStyled
          showContent={showContent}
          backgroundColor={backgroundColor}
        />
      </ContentHiderStyled>
      <Button
        size='m'
        type='outlined'
        onClick={() => setShowContent(showContent => !showContent)}
      >
        {showContent ? hideContentText : showContentText}
      </Button>
    </div>
  );
};
