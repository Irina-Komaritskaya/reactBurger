describe('order', function () {
  before(function () {
    cy.visit(Cypress.env('host'));
  });
  it('send order', function () {
    cy.get('[class^=burger-items_ingredients__]')
      .children()
      .first()
      .as('itemIngredient');
    cy.get('[class*=panel]').as('dropBox');
    cy.dnd('@itemIngredient', '@dropBox');

    // пользователь не вошел
    cy.get('button').contains('Оформить заказ').click();

    cy.get('[id=modal]').contains('Войти').click();
    cy.location('pathname').should('eq', '/login');
    cy.login();
    cy.get('button').contains('Войти').click();

    //пользователь вошел и булка не выбрана
    cy.wait(500);

    cy.get('[class*=burger-components_componentList__]')
      .find('li')
      .its('length')
      .should('eq', 1);

    cy.get('button').contains('Оформить заказ').click();

    cy.on('window:alert', (str) => {
      //@ts-ignore
      expect(str).to.equal(`Для оформления заказа выберите булку`);
    });

    // все условия заказа выполняются
    cy.get('[class*=bun]').children().first().as('item');
    cy.get('[class*=panel]').as('dropBox');
    cy.dnd('@item', '@dropBox');

    cy.get('button').contains('Оформить заказ').click();
    cy.get('[id=modal]').contains('идентификатор заказа');

    cy.wait(15500);
    cy.get('[class*=order-details]')
      .invoke('text')
      .should('match', /^[0-9]*$/);
  });
});
