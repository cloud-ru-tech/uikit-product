// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import { buildArgsParam } from '@storybook/router';

Cypress.Commands.add('getByDataTestId', (value: string) => cy.get(`*[data-test-id="${value}"]`));

Cypress.Commands.add('visitComponent', ({ name, group, props }) => {
  let propsString = '';

  if (props) {
    propsString = buildArgsParam({}, props);
  }

  return cy.visit(
    `http://localhost:6006/iframe.html?id=components${group ? `-${group}` : ''}-${name}--${name}&viewMode=story${
      propsString ? `&args=${propsString}` : ''
    }`,
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
      getByDataTestId(value: string): Chainable<JQuery>;
      visitComponent<T>(args: {
        name: string;
        group?: string;
        props?: {
          [Property in keyof T]: T[Property];
        };
      }): Chainable<AUTWindow>;
    }
  }
}
export {};
