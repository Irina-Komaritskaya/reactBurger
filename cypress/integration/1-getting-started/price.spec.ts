describe('changes price', function () {
  before(function () {
    cy.visit(Cypress.env('host'));
  });
  it('changes price', function () {
    cy.get('[class*=bun]').children().first().as('itemBun');
    cy.get('[class*=panel]').as('dropBox');

    cy.dnd('@itemBun', '@dropBox');

    // изменение цены при перетаскивании булки
    let priceBun = 0;
    let totalPrice = 0;
    cy.get('@itemBun').find('[class^=burger-item_price__]').as('price');
    cy.get('[class*=totalPrice]').children().as('totalPrice');

    cy.get('@price.Bun').then(($price) => {
      priceBun = parseInt($price.text());
    });
    cy.get('@totalPrice').then(($total) => {
      totalPrice = parseInt($total.text());
      //@ts-ignore
      expect(totalPrice).to.equal(priceBun * 2);
    });

    //измение цены при перетаскивании ингредиента
    cy.get('[class^=burger-items_ingredients__]')
      .children()
      .first()
      .as('itemConstructor');

    cy.dnd('@itemConstructor', '@dropBox');

    let priceConstructor = 0;
    cy.get('[class*=burger-components_componentList__]').as(
      'constructor-element'
    );
    cy.get('@constructor-element')
      .children()
      .find('[class^=constructor-element__price]')
      .as('price');
    cy.get('[class*=totalPrice]').children().as('totalPrice');

    cy.get('@price').then(($price) => {
      priceConstructor = parseInt($price.text());
    });
    cy.get('@totalPrice').then(($total) => {
      totalPrice = parseInt($total.text());
      //@ts-ignore
      expect(totalPrice).to.equal(priceConstructor + priceBun * 2);
    });

    //изменение цены при удалении
    cy.get('@constructor-element')
      .find('[class*=constructor-element__action]')
      .first()
      .click();
    cy.get('@totalPrice').then(($total) => {
      totalPrice = parseInt($total.text());
      //@ts-ignore
      expect(totalPrice).to.equal(priceBun * 2);
    });
  });
});
