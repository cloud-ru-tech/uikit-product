import { PredefinedIconsPrivateProps } from '../src';
import { Icons } from '../src/components/icon/constants';

describe('[Predefined Icon Private]:', () => {
  Object.entries(Icons).forEach(([name, icon]) => {
    const testId = `predefinedIcon-${name}-test`;

    function visit(props?: PredefinedIconsPrivateProps) {
      return cy.visitComponent({
        group: 'icons-predefined',
        name: 'predefined-icons-private',
        props: {
          'data-test-id': testId,
          ...(props || {}),
        },
      });
    }

    describe(`${name}:`, () => {
      it('Rendered', () => {
        visit({
          icon: icon as PredefinedIconsPrivateProps['icon'],
        });

        expect(cy.getByDataTestId(testId)).to.exist;
      });
    });
  });
});

describe('[Predefined Logos Private]:', () => {
  describe('ML Space Logo and SberCloud logo:', () => {
    function visit() {
      return cy.visitComponent({
        group: 'icons-predefined',
        name: 'predefined-logos-private',
      });
    }

    it('Rendered', () => {
      visit();

      expect(cy.getByDataTestId('icon-ml-space-full-logo')).to.exist;
      expect(cy.getByDataTestId('icon-sber-cloud-full-logo')).to.exist;
    });
  });
});
