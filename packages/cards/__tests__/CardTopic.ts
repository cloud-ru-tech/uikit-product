import { CardTopicProps } from '@sbercloud/uikit-product-cards';

describe('[Card]: CardTopic', () => {
  const testId = 'card-topic-test';

  function visit(props?: Partial<CardTopicProps>) {
    cy.visitComponent({
      group: 'cards-card',
      name: 'topic',
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
});

export {};
