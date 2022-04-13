import { SwitchProps, SwitchRowProps } from '../src';

describe('[Switch]:', () => {
  const testId = 'switch';

  function visit(props?: Omit<SwitchProps, 'onChange'>) {
    return cy.visitComponent({
      group: 'switch',
      name: 'switch',
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

  it('Checked after click', () => {
    visit();

    cy.getByDataTestId(testId).click();

    cy.getByDataTestId(testId).within(() => {
      cy.get('input').should('be.checked');
    });
  });

  it('Disabled, should not be checked after click', () => {
    visit({
      disabled: true,
      checked: false,
    });

    cy.getByDataTestId(testId).click();

    cy.getByDataTestId(testId).within(() => {
      cy.get('input').should('not.be.checked');
    });
  });
});

describe('[SwitchRow]:', () => {
  const testId = 'switch-row';

  function visit(props?: Omit<SwitchRowProps, 'title' | 'onChange'>) {
    return cy.visitComponent({
      group: 'switch',
      name: 'switch-row',
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

  it('Has tooltip', () => {
    visit();

    cy.getByDataTestId(testId).within(() => {
      cy.get('[data-test-trigger-id="tooltip__trigger-element"]').should('exist').trigger('mouseenter');
    });

    cy.getByDataTestId('switch-row__tooltip').should('exist');
  });

  it('Without tooltip', () => {
    visit({
      checked: false,
      tooltip: undefined,
    });

    cy.getByDataTestId(testId).within(() => {
      cy.get('[data-test-trigger-id="tooltip__trigger-element"]').should('not.exist');
    });
  });

  it('Checked after click', () => {
    visit();

    cy.getByDataTestId(testId).click();

    cy.getByDataTestId(testId).should('have.attr', 'data-checked', 'true');
  });

  it('Disabled, should not be checked after click', () => {
    visit({
      disabled: true,
      checked: false,
    });

    cy.getByDataTestId(testId).click();

    cy.getByDataTestId(testId).should('not.have.attr', 'data-checked');
  });
});

export {};
