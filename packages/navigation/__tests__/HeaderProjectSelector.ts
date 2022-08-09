describe('[Navigation]: Header Project Selector', () => {
  function visit(story: string) {
    return cy.visitComponent({
      category: 'not-stable',
      group: 'navigation',
      name: 'header-project-selector',
      story,
    });
  }

  function getReference() {
    return cy.getByDataTestId('header-project-selector__reference');
  }

  function getFloating() {
    return cy.getByDataTestId('header-project-selector__floating');
  }

  function getOutside() {
    return cy.get('body');
  }

  function getSearch() {
    return cy.getByDataTestId('header-project-selector__search').get('input');
  }

  function getAction() {
    return cy.getByDataTestId('header-project-selector__action');
  }

  function getOptionListItems() {
    return cy.getByDataTestId('header-project-selector__option-list-item');
  }

  function getOptionListItemByValue(value: string) {
    return getOptionListItems().get(`[data-test-value="${value}"]`);
  }

  function getCatalogListItemLabel() {
    return cy.getByDataTestId('header-project-selector__catalog-list-item-label');
  }

  function getProjectPresentationListItemLabel() {
    return cy.getByDataTestId('header-project-selector__project-presentation-list-item-label');
  }

  function getProjectOptionListItemLabel() {
    return cy.getByDataTestId('header-project-selector__project-option-list-item-label');
  }

  function getWorkspaceOptionListItemLabel() {
    return cy.getByDataTestId('header-project-selector__workspace-option-list-item-label');
  }

  function getSelectedProject() {
    return cy.getByDataTestId('header-project-selector__selected-project');
  }

  function getSelectedWorkspace() {
    return cy.getByDataTestId('header-project-selector__selected-workspace');
  }

  function basics() {
    it('opens floating by reference click', () => {
      getReference().click();
      getFloating().should('exist');
    });

    it('opens floating by down arrow type on reference', () => {
      getReference().focus().type('{downArrow}');
      getFloating().should('exist');
    });

    it('closes floating by click outside', () => {
      getReference().click();
      getOutside().click();
      getFloating().should('not.exist');
    });

    it('closes floating by option select by mouse', () => {
      getReference().click();
      getOptionListItemByValue('short-1').click();
      getFloating().should('not.exist');
    });

    it('closes floating by option select by keys', () => {
      getReference().click();
      getOptionListItemByValue('short-1').focus().type('{enter}');
      getFloating().should('not.exist');
    });

    it('closes floating by action click', () => {
      getReference().click();
      getAction().click();
      getFloating().should('not.exist');
    });

    it('filters options when searching', () => {
      getReference().click();
      getSearch().focus().type('zo');
      getOptionListItems().should('have.length', 1).first().should('have.text', 'Zork');
    });

    it('clears search at closing', () => {
      getReference().click();
      getSearch().focus().type('zo');
      getOutside().click();
      getReference().click();
      getSearch().should('be.empty');
    });

    it('goes to last option when typing up arrow', () => {
      getReference().focus().type('{upArrow}{upArrow}');
      getOptionListItems().last().should('be.visible');
    });

    it('goes to last option when opening and it is selected', () => {
      getReference().click();
      getOptionListItems().last().click();
      getReference().click();
      getOptionListItems().last().should('be.visible');
    });
  }

  describe('Projects', () => {
    beforeEach(() => {
      visit('projects');
    });

    basics();

    it('renders selected project', () => {
      getSelectedProject().should('have.text', 'Zialactic');
    });

    it('selects another project by mouse', () => {
      getReference().click();
      getOptionListItemByValue('short-1').click();
      getSelectedProject().should('have.text', 'Zaggles');
    });

    it('selects another project by keys', () => {
      getReference().focus().type('{downArrow}{downArrow}{enter}');
      getSelectedProject().should('have.text', 'Zaggles');
    });

    it('truncates long selected project label', () => {
      getReference().click();
      getOptionListItemByValue('long-0').click();
      getSelectedProject().then(([element]) => {
        cy.wrap(element.offsetWidth).should('be.lessThan', element.scrollWidth);
      });
    });

    it('truncates long project option label', () => {
      getReference().click();
      getOptionListItemByValue('long-0').within(() => {
        getProjectOptionListItemLabel().then(([element]) => {
          cy.wrap(element.offsetWidth).should('be.lessThan', element.scrollWidth);
        });
      });
    });
  });

  describe('Projects With Catalogs', () => {
    beforeEach(() => {
      visit('projects-with-catalogs');
    });

    basics();

    it('renders selected project', () => {
      getSelectedProject().should('have.text', 'Zialactic');
    });

    it('renders catalog labels', () => {
      getReference().click();
      getCatalogListItemLabel().should('exist');
    });

    it('selects another project by mouse', () => {
      getReference().click();
      getOptionListItemByValue('short-1').click();
      getSelectedProject().should('have.text', 'Zaggles');
    });

    it('selects another project by keys', () => {
      getReference().focus().type('{downArrow}{downArrow}{enter}');
      getSelectedProject().should('have.text', 'Zaggles');
    });

    it('truncates long selected project label', () => {
      getReference().click();
      getOptionListItemByValue('long-0').click();
      getSelectedProject().then(([element]) => {
        cy.wrap(element.offsetWidth).should('be.lessThan', element.scrollWidth);
      });
    });

    it('truncates long project option label', () => {
      getReference().click();
      getOptionListItemByValue('long-0').within(() => {
        getProjectOptionListItemLabel().then(([element]) => {
          cy.wrap(element.offsetWidth).should('be.lessThan', element.scrollWidth);
        });
      });
    });
  });

  describe('Projects With Workspaces', () => {
    beforeEach(() => {
      visit('projects-with-workspaces');
    });

    basics();

    it('renders selected project and selected workspace', () => {
      getSelectedProject().should('have.text', 'Zensus');
      getSelectedWorkspace().should('have.text', 'Zialactic');
    });

    it('renders project presentation labels', () => {
      getReference().click();
      getProjectPresentationListItemLabel().should('exist');
    });

    it('selects another project and workspace by mouse', () => {
      getReference().click();
      getOptionListItemByValue('short-5').click();
      getSelectedProject().should('have.text', 'Chillium');
      getSelectedWorkspace().should('have.text', 'Insource');
    });

    it('selects another project and workspace by keys', () => {
      getReference().focus().type('{downArrow}{downArrow}{downArrow}{downArrow}{downArrow}{downArrow}{enter}');
      getSelectedProject().should('have.text', 'Chillium');
      getSelectedWorkspace().should('have.text', 'Insource');
    });

    it('truncates long selected workspace label', () => {
      getReference().click();
      getOptionListItemByValue('long-0').click();
      getSelectedWorkspace().then(([element]) => {
        cy.wrap(element.offsetWidth).should('be.lessThan', element.scrollWidth);
      });
    });

    it('truncates long workspace option label', () => {
      getReference().click();
      getOptionListItemByValue('long-0').within(() => {
        getWorkspaceOptionListItemLabel().then(([element]) => {
          cy.wrap(element.offsetWidth).should('be.lessThan', element.scrollWidth);
        });
      });
    });
  });
});

export {};
