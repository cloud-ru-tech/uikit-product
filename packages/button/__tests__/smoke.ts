import { CommonButtonPropsWithOptionalTooltip } from '@sbercloud/uikit-product-button-private';

import { ButtonTableProps } from '../src/components/ButtonTable';

const buttons = [
  {
    name: 'button',
    componentName: 'Button',
  },
  {
    name: 'button-ghost',
    componentName: 'ButtonGhost',
  },
  {
    name: 'button-icon',
    componentName: 'ButtonIcon',
  },
  {
    name: 'button-icon-transparent',
    componentName: 'ButtonIconTransparent',
  },
  {
    name: 'button-overlay',
    componentName: 'ButtonOverlay',
  },
  {
    name: 'button-round',
    componentName: 'ButtonRound',
  },
  {
    name: 'button-round-big',
    componentName: 'ButtonRoundBig',
  },
  {
    name: 'button-table',
    componentName: 'ButtonTable',
  },
  {
    name: 'button-table-icon',
    componentName: 'ButtonTableIcon',
  },
  {
    name: 'copy-button',
    componentName: 'ButtonIconTransparent',
    skipAsLink: true,
  },
  {
    name: 'refresh-button',
    componentName: 'ButtonIconTransparent',
    skipAsLink: true,
  },
];

buttons.forEach(button => {
  describe(`[Button]: ${button.name}`, () => {
    const testId = `${button.name}-test`;

    function visit(props?: CommonButtonPropsWithOptionalTooltip) {
      return cy.visitComponent({
        group: 'button',
        name: button.name,
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

    it('Tooltip is shown on hover', () => {
      visit({
        tooltip: {
          content: testId,
        },
      });

      cy.getByDataTestId(testId).first().trigger('mouseenter');

      expect(cy.get(`[data-test-id*="button-tooltip__${button.componentName}"]`)).to.exist;
    });

    if (!button.skipAsLink) {
      it('Should render as <a>', () => {
        visit({
          href: testId,
        });

        expect(cy.get(`a[data-test-id="${testId}"]`)).to.exist;
      });
    }
  });
});

function getButtonDataAfterClick(testId: string) {
  const result: Record<string, { svgId: string; innerText: string; el?: JQuery }> = {
    prev: {
      svgId: '',
      innerText: '',
    },
    current: {
      svgId: '',
      innerText: '',
    },
  };

  return cy
    .getByDataTestId(testId)
    .first()
    .within(el =>
      cy
        .get('svg')
        .invoke('attr', 'data-test-id')
        .then(attr => {
          result.prev = {
            svgId: attr || '',
            innerText: el.text(),
          };

          el.trigger('click');
        }),
    )
    .within(el =>
      cy
        .get('svg')
        .invoke('attr', 'data-test-id')
        .then(attr => {
          result.current = {
            svgId: attr || '',
            innerText: el.text(),
            el,
          };
        }),
    )
    .then(() => result);
}

describe('[Button]: ButtonTable:', () => {
  const testId = 'buttonTable-test';
  const managedLoadingTestId = `${testId}-managed-loading`;
  const text = 'Connect';
  const loadingText = 'Loading';

  function visit(props?: Omit<ButtonTableProps, 'href'>) {
    return cy.visitComponent({
      group: 'button',
      name: 'button-table',
      props: {
        'data-test-id': testId,
        ...(props || {}),
      },
    });
  }

  it('Icon and text has changed after click', () => {
    visit({
      text,
      loadingText,
    });

    getButtonDataAfterClick(managedLoadingTestId).then(({ prev, current }) => {
      expect(current.svgId).to.not.eq(prev.svgId);

      expect(current.innerText).to.eq(loadingText);
    });
  });

  it('Nothing should happen if button is disabled', () => {
    visit({
      text,
      loadingText,
      disabled: true,
    });

    getButtonDataAfterClick(managedLoadingTestId).then(({ prev, current }) => {
      expect(prev.svgId).to.eq(current.svgId);
      expect(prev.innerText).to.eq(current.innerText);
    });
  });
});

describe('[Button]: ButtonTableIcon:', () => {
  const testId = 'buttonTableIcon-test';
  const managedLoadingTestId = `${testId}-managed-loading`;

  function visit(props?: CommonButtonPropsWithOptionalTooltip) {
    return cy.visitComponent({
      group: 'button',
      name: 'button-table-icon',
      props: {
        'data-test-id': testId,
        ...(props || {}),
      },
    });
  }

  it('Icon has changed after click', () => {
    visit();

    getButtonDataAfterClick(managedLoadingTestId).then(({ prev, current }) => {
      expect(prev.svgId).to.not.eq(current.svgId);
    });
  });

  it('Nothing should happen if button is disabled', () => {
    visit({
      disabled: true,
    });

    getButtonDataAfterClick(managedLoadingTestId).then(({ prev, current }) => {
      expect(prev.svgId).to.eq(current.svgId);
    });
  });
});

describe('[Button]: CopyButton:', () => {
  const testId = 'copy-button-test';

  function visit(props?: CommonButtonPropsWithOptionalTooltip) {
    return cy.visitComponent(
      {
        group: 'button',
        name: 'copy-button',
        props: {
          'data-test-id': testId,
          text: testId,
          ...(props || {}),
        },
      },
      {
        onBeforeLoad(win: Cypress.AUTWindow) {
          cy.stub(win, 'prompt').as('prompt').returns(testId);
        },
      },
    );
  }

  it('Text is copied to clipboard and icon has changed after click', () => {
    visit();

    getButtonDataAfterClick(testId).then(({ prev, current }) => {
      cy.get('@prompt').should('have.returned', testId);

      expect(current.svgId).to.not.eq(prev.svgId);
    });
  });

  it('Nothing should happen if button is disabled', () => {
    visit({
      disabled: true,
    });

    getButtonDataAfterClick(testId).then(({ prev, current }) => {
      cy.get('@prompt').should('not.be.called');

      expect(current.svgId).to.eq(prev.svgId);
    });
  });
});

export {};
