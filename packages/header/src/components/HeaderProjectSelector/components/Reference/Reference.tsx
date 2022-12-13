import { useContext } from 'react';

import { FloatingContext, ReferenceContext } from '../../contexts';
import { IconWrapper } from '../IconWrapper';
import { ProjectLabel } from '../ProjectLabel';
import { WorkspaceLabel } from '../WorkspaceLabel';
import * as S from './styled';

export type ReferenceProps = {
  selectedProject?: string;
  selectedWorkspace?: string;
  isMobile?: boolean;
};

export function Reference({ selectedProject, selectedWorkspace, isMobile }: ReferenceProps) {
  const { isOpen } = useContext(FloatingContext);
  const { getProps, setElement } = useContext(ReferenceContext);

  return (
    <S.Wrapper
      type='button'
      ref={setElement}
      data-open={isOpen || undefined}
      data-test-id='header-project-selector__reference'
      data-mobile={isMobile || undefined}
      {...getProps()}
    >
      <S.Selection data-mobile={isMobile || undefined}>
        {selectedProject && (
          <S.Segment>
            <ProjectLabel label={selectedProject} data-test-id='header-project-selector__selected-project' />
          </S.Segment>
        )}
        {selectedWorkspace && (
          <S.Segment>
            <WorkspaceLabel label={selectedWorkspace} data-test-id='header-project-selector__selected-workspace' />
          </S.Segment>
        )}
      </S.Selection>
      <IconWrapper>
        <S.Arrow data-open={isOpen || undefined} />
      </IconWrapper>
    </S.Wrapper>
  );
}
