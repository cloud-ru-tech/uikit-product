import { useContext } from 'react';

import { FloatingContext } from '../../contexts/FloatingContext';
import { ReferenceContext } from '../../contexts/ReferenceContext';
import { HeaderProjectSelectorIcon } from '../HeaderProjectSelectorIcon';
import { HeaderProjectSelectorProjectLabel } from '../HeaderProjectSelectorProjectLabel';
import { HeaderProjectSelectorWorkspaceLabel } from '../HeaderProjectSelectorWorkspaceLabel';
import * as S from './styled';

export type HeaderProjectSelectorReferenceProps = {
  selectedProject?: string;
  selectedWorkspace?: string;
};

export function HeaderProjectSelectorReference({
  selectedProject,
  selectedWorkspace,
}: HeaderProjectSelectorReferenceProps) {
  const { isOpen } = useContext(FloatingContext);
  const { getProps, setElement } = useContext(ReferenceContext);

  return (
    <S.Wrapper
      type='button'
      ref={setElement}
      data-open={isOpen || undefined}
      data-test-id='header-project-selector__reference'
      {...getProps()}
    >
      <S.Selection>
        {selectedProject && (
          <S.Segment>
            <HeaderProjectSelectorProjectLabel
              label={selectedProject}
              data-test-id='header-project-selector__selected-project'
            />
          </S.Segment>
        )}
        {selectedWorkspace && (
          <S.Segment>
            <HeaderProjectSelectorWorkspaceLabel
              label={selectedWorkspace}
              data-test-id='header-project-selector__selected-workspace'
            />
          </S.Segment>
        )}
      </S.Selection>
      <HeaderProjectSelectorIcon>
        <S.Arrow data-open={isOpen || undefined} />
      </HeaderProjectSelectorIcon>
    </S.Wrapper>
  );
}
