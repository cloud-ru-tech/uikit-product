import { InputMaster, InputMasterProps } from '../../helperComponents';
import { DropListProps, Floating, Input } from './components';

export type AutocompleteProps = Omit<InputMasterProps, 'children' | 'autoComplete'> & {
  options: DropListProps['options'];
  onSelect: (option: DropListProps['options'][0]) => void;
  placeholder?: string;
  loading?: boolean;
  isOptionsError?: boolean;
};

const Autocomplete = ({ placeholder, options, onSelect, loading, isOptionsError, ...props }: AutocompleteProps) => (
  <Floating
    options={options}
    value={props.value}
    onSelect={onSelect}
    loading={loading}
    isOptionsError={isOptionsError}
    disabled={props.disabled}
  >
    <Input {...props} placeholder={placeholder} />
  </Floating>
);

Autocomplete.sizes = InputMaster.sizes;

export { Autocomplete };
