import { CardWideProps } from '@sbercloud/uikit-product-cards';

describe('[Card]: CardWide', () => {
  const testId = 'card-wide-test';

  function visit(props?: Partial<CardWideProps>) {
    cy.visitComponent({
      group: 'cards-card',
      name: 'wide',
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
