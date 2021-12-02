/// <reference types="cypress" />
// @ts-check

describe('dnd ingredient to constructor', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });
  it('dnd ingredient', function () {
    cy.get('[class^=burger-items_ingredients__]').children().first().as('item');
    cy.get('[class*=panel]').as('dropBox');

    // перетаскивание
    cy.get('@item').trigger('dragstart').trigger('dragleave');
    cy.get('@dropBox')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop')
      .trigger('dragend');

    // счетчик в ингредиентах
    cy.get('@item').find('[class*=counter]').should('contain', '1');

    // сравнение пертаскиваемого и положенного в конструктор
    let imgUrlItem = '';
    let imgUrlTopItemConstructor = '';

    cy.get('[class*=burger-components_componentList__]').as(
      'constructor-element'
    );

    cy.get('@item')
      .find('img')
      .then(($img) => {
        imgUrlItem = $img.attr('src');
      });

    cy.get('@constructor-element')
      .find('img')
      .then(($img) => {
        imgUrlTopItemConstructor = $img.attr('src');
        expect(imgUrlItem).to.equal(imgUrlTopItemConstructor);
      });

    // перетаскивание второго ингредиента
    cy.get('@item').trigger('dragstart').trigger('dragleave');
    cy.get('@dropBox')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop')
      .trigger('dragend');

    // проверка что два элемента в корзине
    cy.get('[class*=burger-components_componentList__]')
      .find('li')
      .its('length')
      .should('eq', 2);

    // счетчик в ингредиентах
    cy.get('@item').find('[class*=counter]').should('contain', '2');

    // сравнение пертаскиваемого и положенного в конструктор
    cy.get('[class*=burger-components_componentList__]')
      .children()
      .next()
      .as('constructor-element');

    cy.get('@item')
      .find('img')
      .then(($img) => {
        imgUrlItem = $img.attr('src');
      });

    cy.get('@constructor-element')
      .find('img')
      .then(($img) => {
        imgUrlTopItemConstructor = $img.attr('src');
        expect(imgUrlItem).to.equal(imgUrlTopItemConstructor);
      });
  });
});
