import { CardImageProps } from '@sbercloud/uikit-product-cards';

describe('[Card]: CardImage', () => {
  const testId = 'card-image-test';

  function visit(props?: Partial<CardImageProps>) {
    cy.visitComponent({
      group: 'cards-card',
      name: 'image',
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

  it('change signature', () => {
    const signature = 'New signature';
    visit({ signature });

    cy.getByDataTestId(testId).within(() => cy.contains(signature));
  });
});

export {};
