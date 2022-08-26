import { cx } from '@linaria/core';
import debounce from 'lodash.debounce';
import { MouseEvent, useEffect, useRef, useState } from 'react';

import { downloadFile } from '@sbercloud/ft-download-file';
import { formatBytes } from '@sbercloud/ft-formatters';
import { ButtonIcon, ButtonIconProps } from '@sbercloud/uikit-product-button';
import { CloseInterfaceSVG, FileInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Tooltip } from '@sbercloud/uikit-product-tooltip';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { getFileType } from '../helpers';
import { FileProps } from '../types';
import * as S from './styled';

export type DocumentProps = WithSupportProps<{
  file: FileProps;
  onClick?(file: FileProps, e?: MouseEvent): void;
  disabled?: boolean;
  className?: string;
  removeButton?: {
    onClick(file: FileProps, e?: MouseEvent): void;
    tooltip: ButtonIconProps['tooltip'];
  };
}>;

export function Document({ file, disabled, onClick, removeButton, className, ...rest }: DocumentProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLSpanElement | null>(null);

  const [needsTooltip, setNeedsTooltip] = useState(false);

  useEffect(() => {
    const toggleTooltip = debounce(() => {
      let showTooltip = false;

      if (contentRef.current && titleRef.current) {
        showTooltip = titleRef.current.scrollWidth > contentRef.current.offsetWidth;
      }

      setNeedsTooltip(showTooltip);
    }, 100);

    toggleTooltip();
    window.addEventListener('resize', toggleTooltip);

    return () => window.removeEventListener('resize', toggleTooltip);
  }, []);

  const handleClick = (e: MouseEvent) => {
    if (disabled) {
      return;
    }

    if (onClick) {
      onClick(file, e);
      return;
    }

    if (file.path) {
      downloadFile({
        fileName: file.name,
        path: file.path,
      });
    }
  };

  const fileName = file.displayName || file.name;
  const fileSize = file.size && formatBytes(file.size);
  const fileType = getFileType(file);

  const handleRemoveClick = (e: MouseEvent) => {
    e.stopPropagation();

    removeButton?.onClick(file, e);
  };

  const documentContent = (
    <S.Document data-disabled={disabled || undefined} onClick={handleClick} {...extractSupportProps(rest)}>
      <FileInterfaceSVG size={32} className={S.iconClassName} />

      <S.Content data-has-remove={Boolean(removeButton) || undefined} ref={contentRef}>
        <S.Name data-test-id='document__name' ref={titleRef}>
          {fileName}
        </S.Name>

        <S.Info>
          {fileType && <span data-test-id='document__type'>{fileType}</span>}

          {fileSize && <span data-test-id='document__size'>{fileSize}</span>}
        </S.Info>
      </S.Content>

      {removeButton && (
        <ButtonIcon
          variant={ButtonIcon.variants.Color}
          data-test-id='document__remove'
          disabled={disabled}
          tooltip={removeButton.tooltip}
          icon={<CloseInterfaceSVG size={20} />}
          onClick={handleRemoveClick}
          className={S.removeButtonClassName}
        />
      )}
    </S.Document>
  );

  if (needsTooltip) {
    return (
      <Tooltip
        data-test-id='document__tooltip'
        content={fileName}
        classNameTrigger={cx(S.wrapClassName, className)}
        type={Tooltip.types.Tip}
      >
        {documentContent}
      </Tooltip>
    );
  }

  return <div className={cx(S.wrapClassName, className)}>{documentContent}</div>;
}
