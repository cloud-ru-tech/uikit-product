import { useState } from 'react';

import { EyeSVG } from '@aicloud/ui-icons';

import { InputProps, Input } from 'components/Input';

import { ButtonBox } from './styled';

export const InputSecurity: React.FC<InputProps> = props => {
  const [isViewMode, setIsViewMode] = useState(false);

  return (
    <Input
      {...props}
      type={isViewMode ? 'default' : 'security'}
      postfix={
        <ButtonBox onClick={(): void => setIsViewMode(!isViewMode)}>
          {/* NOW */}
          {isViewMode ? <EyeSVG /> : <EyeSVG />}
        </ButtonBox>
      }
    />
  );
};
