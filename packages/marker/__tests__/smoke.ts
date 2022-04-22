import { MarkerProps } from '../src';
import { Variants } from '../src/components/constants';

describe('[Marker]:', () => {
  const testId = 'marker__test';

  function visit(props?: Partial<MarkerProps>) {
    cy.visitComponent<MarkerProps>({
      name: 'marker',
      props: {
        text: props?.text || 'marker',
        variant: Variants.Green,
        'data-test-id': testId,
        ...(props || {}),
      },
    });
  }

  it('Rendered', () => {
    visit();

    expect(cy.getByDataTestId(testId)).to.exist;
  });

  it('text = Marker, content should be Marker', () => {
    const markerText = 'Marker';
    visit({
      text: markerText,
    });

    cy.getByDataTestId(testId).should('have.text', markerText);
  });
});

export {};
