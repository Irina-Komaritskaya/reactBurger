
describe('dnd sort constructor', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });
  it('dnd sort constructor', function () {
    cy.get('[class^=burger-items_ingredients__]')
      .children()
      .first()
      .as('itemIngredient');
    cy.get('[class*=panel]').as('dropBox');

    cy.get('@itemIngredient').next().as('itemIngredientNext')
    cy.dnd('@itemIngredient')
    cy.dnd('@itemIngredientNext')

    cy.get('[class*=burger-components_componentList__]')
      .find('li')
      .first()
      .as('itemComponent');

    cy.get('@itemComponent').next().trigger('dragstart').trigger('dragleave');
    cy.get('@dropBox')
      .find('[class*=burger-components_componentList]')
      .trigger('dragenter')
      .trigger('dragover', 'top')
      .trigger('drop', 'top')
      .trigger('dragend', 'top');
  });
});
