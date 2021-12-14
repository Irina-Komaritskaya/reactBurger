Cypress.Commands.add('dnd', (element, dropBox) => {
  // перетаскивание
  cy.get(element).trigger('dragstart').trigger('dragleave');
  cy.get(dropBox)
    .trigger('dragenter')
    .trigger('dragover')
    .trigger('drop')
    .trigger('dragend');
});

Cypress.Commands.add('login', () => {
  cy.get('input[name=email]').type(Cypress.env('userName'));
  cy.get('input[name=password]').type(Cypress.env('userPassword'));
});
