import { RefObject, useEffect, useState } from 'react';

import { PlusSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { FieldTextAreaProps } from '@sbercloud/uikit-product-mobile-fields';
import { ButtonFunction } from '@snack-uikit/button';

export function FieldWithAddButton({
  children,
  size,
  autoFocusRef,
}: {
  children: React.ReactNode;
  size?: FieldTextAreaProps['size'];
  autoFocusRef: RefObject<HTMLTextAreaElement | null>;
}) {
  const { t } = useLocale('FieldsPredefined');
  const [showField, setShowField] = useState(false);

  useEffect(() => {
    if (showField && autoFocusRef.current) {
      autoFocusRef.current.focus();
    }
  }, [showField, autoFocusRef]);

  if (showField) {
    return children;
  }

  return (
    <div>
      {!showField && (
        <ButtonFunction
          icon={<PlusSVG />}
          iconPosition='before'
          label={t('FieldDescription.addButton')}
          onClick={() => setShowField(true)}
          size={size}
        />
      )}
    </div>
  );
}
