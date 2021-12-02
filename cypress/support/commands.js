Cypress.Commands.add('dnd', (element) => {
  // перетаскивание
  cy.get(element).trigger('dragstart').trigger('dragleave');
  cy.get('@dropBox')
    .trigger('dragenter')
    .trigger('dragover')
    .trigger('drop')
    .trigger('dragend');
});

Cypress.Commands.add('login', (user) => {
  cy.get('input[name=email]').type(user.email);
  cy.get('input[name=password]').type(user.password);
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
