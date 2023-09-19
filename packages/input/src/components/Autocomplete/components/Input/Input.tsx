import { ChangeEvent, useContext } from 'react';

import { SimpleInput } from '@sbercloud/uikit-product-input-private';

import { InputMaster, InputMasterProps } from '../../../../helperComponents';
import { FloatingContext, ReferenceContext } from '../../contexts';

export type InputProps = Omit<InputMasterProps, 'children'> & {
  placeholder?: string;
  onChange: (value: string, event?: ChangeEvent<HTMLInputElement>) => void;
  isOpenOnFocus?: boolean;
};

export function Input({ placeholder, onChange, isOpenOnFocus, ...props }: InputProps) {
  const { isOpen, setIsOpen } = useContext(FloatingContext);

  const { getProps, setElement } = useContext(ReferenceContext);

  const handleInputChange = (value: string, event?: ChangeEvent<HTMLInputElement> | undefined) => {
    if (!isOpen && value.trim()) {
      setIsOpen(true);
    }

    if (!value.trim()) {
      setIsOpen(false);
    }

    onChange(value, event);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    // необходимо для того, чтобы при нажатии на крестик и возвращении фокуса в поле не открывался дропдаун
    setTimeout(() => {
      if (e.target.value || isOpenOnFocus) {
        setIsOpen(true);
      }
    }, 100);
  };

  return (
    <InputMaster onChange={handleInputChange} {...props}>
      {props => (
        <div ref={setElement}>
          <SimpleInput {...props} placeholder={placeholder} ellipsis onFocus={handleFocus} {...getProps()} />
        </div>
      )}
    </InputMaster>
  );
}
