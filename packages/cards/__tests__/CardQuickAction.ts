import { CardQuickActionProps } from '@sbercloud/uikit-product-cards';

describe('[Card]: CardQuickAction', () => {
  const testId = 'card-quick-action-test';

  function visit(props?: Partial<CardQuickActionProps>) {
    cy.visitComponent({
      group: 'cards-card',
      name: 'quick-action',
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
