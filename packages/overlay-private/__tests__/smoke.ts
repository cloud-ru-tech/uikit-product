import { OverlayPrivateProps } from '../src';

describe('[OverlayPrivate]:', () => {
  const testId = 'overlay-private-test';

  function visit(props?: OverlayPrivateProps) {
    return cy.visitComponent({
      name: 'overlay-private',
      props: {
        'data-test-id': testId,
        ...(props || {}),
      },
    });
  }

  it('Rendered', () => {
    visit();

    cy.getByDataTestId('open_overlay').click().getByDataTestId(testId).should('exist');
  });
});

export {};
