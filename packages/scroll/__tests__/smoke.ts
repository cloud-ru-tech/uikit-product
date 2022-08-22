import { ScrollProps } from '../src';

describe('[Scroll]:', () => {
  const testId = `scroll-test`;

  function visit(props?: ScrollProps) {
    return cy.visitComponent({
      name: 'scroll',
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
});
