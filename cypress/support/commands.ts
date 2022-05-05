// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import { buildArgsParam } from './helpers';

Cypress.Commands.add('getByDataTestId', (value, options) => cy.get(`*[data-test-id="${value}"]`, options));

Cypress.Commands.add('visitComponent', ({ name, group, props, category = 'components' }, options) => {
  let propsString = '';

  if (props) {
    propsString = buildArgsParam(props);
  }

  return cy.visit(
    `http://localhost:6006/iframe.html?id=${category}${group ? `-${group}` : ''}-${name}--${name}&viewMode=story${
      propsString ? `&args=${propsString}` : ''
    }`,
    options,
  );
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-test-id attribute.
       * @example cy.getByDataTestId('private-input')
       */
      getByDataTestId(
        value: string,
        options?: Partial<Loggable & Timeoutable & Withinable & Shadow>,
      ): Chainable<JQuery>;
      visitComponent<T>(
        args: {
          name: string;
          group?: string;
          category?: string;
          props?: {
            [Property in keyof T]: T[Property];
          };
        },
        options?: Partial<VisitOptions>,
      ): Chainable<AUTWindow>;
    }
  }
}
export {};
