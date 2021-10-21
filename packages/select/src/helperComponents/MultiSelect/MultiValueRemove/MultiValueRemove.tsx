import { components } from 'react-select';
import { MultiValueRemoveProps } from 'react-select/src/components/MultiValue';

import { CloseInterfaceSVG } from '@sbercloud/uikit-react-icons';

import { IconClassName } from './styled';

export function MultiValueRemove(props: MultiValueRemoveProps<never>) {
  return (
    <components.MultiValueRemove {...props}>
      <CloseInterfaceSVG className={IconClassName} />
    </components.MultiValueRemove>
  );
}
