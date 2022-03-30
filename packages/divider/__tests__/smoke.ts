describe('[Divider]:', () => {
  const testId = 'dividerTest';

  it('Rendered', () => {
    cy.visitComponent({
      name: 'divider',
      props: {
        'data-test-id': testId,
      },
    });

    expect(cy.getByDataTestId(testId)).to.exist;
  });
});

export {};
