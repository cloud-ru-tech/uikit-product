import { ReactNode } from 'react';

import { StatusTag } from '@sbercloud/uikit-product-status';
import { Tag } from '@sbercloud/uikit-product-tag';
import { TruncateString } from '@sbercloud/uikit-product-truncate-string';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import * as S from './styled';
import { Types } from './types/status';
import { Colors } from './types/tag';

enum CardTag {
  Status = 'tag-status',
  Colored = 'tag-colored',
}

export type CardProductProps = WithSupportProps<{
  icon: JSX.Element;
  title: string;
  description: string;
  className?: string;
  actions?: ReactNode;
  onClick?(): void;
  tag?:
    | {
        view: CardTag.Status;
        text: string;
        type: Types;
      }
    | {
        view: CardTag.Colored;
        text: string;
        color: Colors;
      };
}>;

export function CardProduct({ className, icon, title, description, tag, actions, onClick, ...rest }: CardProductProps) {
  return (
    <S.Wrapper
      className={className}
      onClick={onClick}
      data-clickable={Boolean(onClick) || undefined}
      {...extractSupportProps(rest)}
    >
      <S.Heading>
        <S.Icon>{icon}</S.Icon>

        {tag?.view === CardTag.Status && <StatusTag text={tag.text} type={tag.type} />}

        {tag?.view === CardTag.Colored && <Tag value={tag.text} color={tag.color} />}
      </S.Heading>

      <S.Title
        text={title}
        data-test-id='card-product__title'
        textEntity={TruncateString.textEntities.H3}
        maxLines={2}
        textClassName={Boolean(onClick) ? S.cursorPointerClassName : undefined}
      />

      <S.Description
        data-test-id='card-product__description'
        text={description}
        textEntity={TruncateString.textEntities.Text2}
        maxLines={4}
        textClassName={Boolean(onClick) ? S.cursorPointerClassName : undefined}
      />

      {actions && <S.Actions>{actions}</S.Actions>}
    </S.Wrapper>
  );
}

CardProduct.statusTypes = Types;
CardProduct.tagColors = Colors;
CardProduct.tag = CardTag;
