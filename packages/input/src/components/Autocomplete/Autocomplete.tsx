import { InputMaster, InputMasterProps } from '../../helperComponents';
import { DropListProps, Floating, Input } from './components';

export type AutocompleteProps = Omit<InputMasterProps, 'children' | 'autoComplete'> & {
  options: DropListProps['options'];
  onSelect: (option: DropListProps['options'][0]) => void;
  additionalButton?: DropListProps['additionalButton'];
  placeholder?: string;
  loading?: boolean;
  isOptionsError?: boolean;
  isOpenOnFocus?: boolean;
  notFoundText?: string;
};

function Autocomplete({
  placeholder,
  options,
  onSelect,
  loading,
  isOptionsError,
  additionalButton,
  notFoundText = 'Совпадений не найдено',
  ...props
}: AutocompleteProps) {
  return (
    <Floating
      options={options}
      value={props.value}
      onSelect={onSelect}
      loading={loading}
      isOptionsError={isOptionsError}
      disabled={props.disabled}
      additionalButton={additionalButton}
      notFoundText={notFoundText}
    >
      <Input {...props} placeholder={placeholder} />
    </Floating>
  );
}

Autocomplete.sizes = InputMaster.sizes;

export { Autocomplete };
