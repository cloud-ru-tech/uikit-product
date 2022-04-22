import { SpinnerProps } from '../src';

describe('[Spinner]:', () => {
  const testId = 'spinner__test';
  const textId = 'spinner__text';

  function visit(props?: SpinnerProps) {
    cy.visitComponent<SpinnerProps>({
      name: 'spinner',
      props: {
        'data-test-id': testId,
        ...(props || {}),
      },
    });
  }

  it('Rendered', () => {
    visit();

    expect(cy.getByDataTestId(testId)).to.exist;
  });

  it('text: Spinner, content should be Spinner', () => {
    const spinnerText = 'Spinner';
    visit({
      text: spinnerText,
    });

    expect(cy.getByDataTestId(textId)).to.exist;
    cy.getByDataTestId(textId).should('have.text', spinnerText);
  });
});

export {};
