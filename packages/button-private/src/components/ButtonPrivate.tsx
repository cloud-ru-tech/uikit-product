import { CommonButtonProps } from '../types';
import { styledButtonPrivate } from './styled';

function StylelessButtonPrivate(props: React.PropsWithChildren<CommonButtonProps>) {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const { disabled, onClick } = props;

    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (onClick) {
      onClick(event);
    }
  };

  return 'href' in props && Boolean(props.href) ? (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      {...props}
      onClick={handleClick}
      href={props.disabled ? '#' : props.href}
      target={props.target || '_blank'}
      className={props.className}
      tabIndex={props.disabled ? -1 : 0}
    >
      {props.children}
    </a>
  ) : (
    <button type='button' {...props} className={props.className} />
  );
}

export const ButtonPrivate = styledButtonPrivate(StylelessButtonPrivate);
