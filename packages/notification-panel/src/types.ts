import { MouseEventHandler, ReactText } from 'react';

import { AvatarProps } from '@sbercloud/uikit-product-avatar';

export enum CardType {
  Default = 'default',
  Alarm = 'alarm',
}

type ButtonProps = {
  text: ReactText;
  onClick?: MouseEventHandler<HTMLElement>;
};

export type Card = {
  id: string;
  type: CardType;
  showNewBadge: boolean;
  header: {
    headerIcon?: JSX.Element;
    breadcrumbsTitles: string[];
    time?: string;
  };
  content: {
    contentIcon?: JSX.Element;
    title: string;
    description: JSX.Element;
    avatar?: AvatarProps;
    buttons?: ButtonProps[];
    onCardClick?(id: string): void;
  };
};
