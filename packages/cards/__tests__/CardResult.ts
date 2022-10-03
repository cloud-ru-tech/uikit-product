import { CardResultProps } from '@sbercloud/uikit-product-cards';

describe('[Card]: CardResult', () => {
  const testId = 'card-result-test';

  function visit(props?: Partial<CardResultProps>) {
    cy.visitComponent({
      group: 'cards-card',
      name: 'result',
      props: {
        'data-test-id': testId,
        ...(props || {}),
      },
    });
  }

  it('first render', () => {
    visit();

    cy.getByDataTestId(testId).should('exist');
  });

  it('change title', () => {
    const title = 'New title';
    visit({ title });

    cy.getByDataTestId(testId).within(() => cy.contains(title));
  });

  it('change description', () => {
    const description = 'New description';
    visit({ description });

    cy.getByDataTestId(testId).within(() => cy.contains(description));
  });
});

export {};
