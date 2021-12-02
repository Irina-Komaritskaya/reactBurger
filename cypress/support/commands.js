Cypress.Commands.add('addBun', () => {
  cy.get('[class*=bun]').children().first().as('item');
  cy.get('[class*=panel]').as('dropBox');

  // перетаскивание
  cy.get('@item').trigger('dragstart').trigger('dragleave');
  cy.get('@dropBox')
    .trigger('dragenter')
    .trigger('dragover')
    .trigger('drop')
    .trigger('dragend');
});
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
