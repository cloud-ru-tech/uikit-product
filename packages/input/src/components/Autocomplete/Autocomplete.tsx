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
};

function Autocomplete({
  placeholder,
  options,
  onSelect,
  loading,
  isOptionsError,
  additionalButton,
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
    >
      <Input {...props} placeholder={placeholder} />
    </Floating>
  );
}

Autocomplete.sizes = InputMaster.sizes;

export { Autocomplete };
