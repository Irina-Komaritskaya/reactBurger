
describe('del item in constructor', function () {
  before(function () {
    cy.visit(Cypress.env('host'));
  });
  it('del item', function () {
    cy.get('[class^=burger-items_ingredients__]').children().first().as('item');
    cy.get('[class*=panel]').as('dropBox');

    cy.dnd('@item', '@dropBox');
    cy.dnd('@item', '@dropBox');

    cy.get('[class*=burger-components_componentList__]')
      .find('li')
      .as('itemConstructor');

    cy.get('@itemConstructor').its('length').should('eq', 2);

    cy.get('@itemConstructor')
      .find('[class*=constructor-element__action]')
      .first()
      .click();

    cy.get('@itemConstructor').its('length').should('eq', 1);
  });
});
