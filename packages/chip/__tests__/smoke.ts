import { ChipProps } from '../src';

describe('[Chip]:', () => {
  const testId = 'chip-test';

  function visit(props?: ChipProps) {
    return cy.visitComponent({
      name: 'chip',
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

  it('Should be checked after click', () => {
    visit();

    cy.getByDataTestId(testId).click().should('have.attr', 'data-checked', 'true');
  });

  it('disabled = true, should not be checked after click', () => {
    visit({
      label: 'disabled',
      checked: false,
      disabled: true,
      handleChange() {},
    });

    cy.getByDataTestId(testId).click().should('not.have.attr', 'data-checked');
  });
});

export {};
