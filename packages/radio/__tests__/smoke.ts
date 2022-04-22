import { RadioProps } from '../src';

function visit(name: string, testId: string, props?: Partial<RadioProps>) {
  cy.visitComponent<Partial<RadioProps>>({
    name,
    group: 'radio',
    props: {
      'data-test-id': testId,
      value: 'Story1',
      ...(props || {}),
    },
  });
}

const getDataTestOptionIdByValue = (value: string) => `*[data-test-option-id="${value}"]`;

describe('[Radio]:', () => {
  const name = 'radio';
  const testId = 'radio__test';
  const labelId = 'radio__label';

  it('Rendered', () => {
    visit(name, testId);

    expect(cy.getByDataTestId(testId)).to.exist;
  });

  it('label: Radio, content should be Radio', () => {
    const label = 'Radio';
    visit(name, testId, {
      label,
    });

    cy.getByDataTestId(labelId).should('have.text', 'Radio');
  });
});

describe('[RadioGroup]:', () => {
  const testId = 'radio__test';
  const name = 'radio-group';

  it('Rendered', () => {
    visit(name, testId);

    expect(cy.getByDataTestId(testId)).to.exist;
  });

  it('change default selection', () => {
    const value = 'Story0';
    visit(name, testId);

    cy.get(getDataTestOptionIdByValue(value)).within(() =>
      cy.getByDataTestId('icon-radio-unchecked-interface').should('exist').click(),
    );

    cy.get(getDataTestOptionIdByValue(value)).within(() =>
      cy.getByDataTestId('icon-radio-checked-interface').should('exist'),
    );
  });

  it('disabled: true', () => {
    const disableValue = 'Story2';
    visit(name, testId);

    cy.get(getDataTestOptionIdByValue(disableValue)).within(() =>
      cy.getByDataTestId('icon-radio-unchecked-interface').should('exist').click(),
    );

    cy.get(getDataTestOptionIdByValue(disableValue)).within(() =>
      cy.getByDataTestId('icon-radio-unchecked-interface').should('exist'),
    );
  });
});

export {};
