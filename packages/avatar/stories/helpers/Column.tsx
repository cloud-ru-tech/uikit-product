import { Avatar, AvatarProps } from '@sbercloud/uikit-react-avatar';
import { Divider } from '@sbercloud/uikit-react-divider';

import { Sizes, Variants } from '../../src/helpers';
import { ItemWrap, StyledColumn, Title } from './styled';

export const Column = ({
  title,
  data,
  variant,
  size,
}: {
  title: string;
  data: Omit<AvatarProps, 'variant'>[];
  size?: Sizes;
  variant: Variants.Company | Variants.Other | Variants.User;
}) => (
  <StyledColumn>
    <Title>
      {title}

      <Divider />
    </Title>

    {data.map((item, index) => (
      <div key={item.src || item.name || index}>
        <ItemWrap>
          <div>name - {String(item.name)}</div>
          <div>clickable - {String(Boolean(item.onClick))}</div>
          <br />

          <Avatar {...item} variant={variant} size={size} />
        </ItemWrap>

        {index !== data.length - 1 && <Divider />}
      </div>
    ))}
  </StyledColumn>
);
