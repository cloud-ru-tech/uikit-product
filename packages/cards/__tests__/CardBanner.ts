import { CardBannerProps } from '@sbercloud/uikit-product-cards';

describe('[Card]: CardBanner', () => {
  const testId = 'card-banner-test';

  function visit(props?: Partial<CardBannerProps>) {
    cy.visitComponent({
      group: 'cards-card',
      name: 'banner',
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

  it('button render', () => {
    const buttonText = 'Button';
    visit();

    cy.getByDataTestId(testId).within(() => cy.contains(buttonText));
  });
});

export {};
