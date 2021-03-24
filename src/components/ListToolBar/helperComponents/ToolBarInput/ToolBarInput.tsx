import React, { FC, useEffect, useState } from 'react';
import clsx from 'clsx';

import { SearchSVG, CrossSVG } from '@aicloud/ui-icons';

import { Input, IInputProps } from 'components/Input';

import {
  crossIconClassName,
  searchIconClassname,
  inputClassName,
} from './styled';

export type IToolBarInputProps = IInputProps;

export const ToolBarInput: FC<IToolBarInputProps> = ({
  value,
  onChange,
  wrapperClassName,
  ...inputProps
}) => {
  const customInputRef = React.createRef<HTMLInputElement>();
  const [hasPrevSibling, setPrevSibling] = useState<undefined | boolean>();
  const [hasNextSibling, setNextSibling] = useState<undefined | boolean>();

  useEffect(() => {
    const inputEL = customInputRef?.current;
    if (!inputEL) return;

    setPrevSibling(Boolean(inputEL.previousSibling) || undefined);
    setNextSibling(Boolean(inputEL.nextSibling) || undefined);
  }, [customInputRef]);

  return (
    <Input
      {...inputProps}
      ref={customInputRef}
      value={value}
      onChange={onChange}
      wrapperClassName={clsx(inputClassName, wrapperClassName)}
      type='embed'
      data-has-prev-sibling={hasPrevSibling || undefined}
      data-has-next-sibling={hasNextSibling || undefined}
      postfix={
        value ? (
          <CrossSVG className={crossIconClassName} onClick={(): void => {}} />
        ) : (
          <SearchSVG className={searchIconClassname} />
        )
      }
      placeholder='Поиск'
    />
  );
};
