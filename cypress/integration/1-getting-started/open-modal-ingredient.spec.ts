/// <reference types="cypress" />
// @ts-check

describe('open modal ingredient', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });
  it('show modal', function () {
    cy.get('[class^=burger-item_link]').first().as('item');

    let nameItem = '';
    let nameItemModal = '';

    cy.get('@item')
      .find('[class*=text_type_main-default]')
      .then(($name) => {
        nameItem = $name.text();
      });

    cy.get('@item').click();
    cy.url().should('include', '/ingredient/');

    // проверка ингредиент нажатия совпадает с ингредиентом открытия
    cy.get('[class*=modal]').as('modal');

    cy.get('@modal')
      .find('[class*=text_type_main-medium]')
      .then(($name) => {
        nameItemModal = $name.text();
        expect(nameItemModal).to.equals(nameItem);
      });

    // закрытие
    cy.get('[class*=modal_title__]').find('svg').as('closeIcon');
    cy.get('@closeIcon').click();
    cy.get('@item').click();
    cy.get('[class^=modal-overlay_overlay__]').as('closeDiv');
    cy.get('@closeDiv').click('topRight');
    
  });
});
