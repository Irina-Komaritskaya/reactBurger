/// <reference types="cypress" />
// @ts-check

describe('dnd bun to constructor', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });
  it('dnd', function () {
    cy.get('[class*=bun]').children().first().as('item');
    cy.get('[class*=panel]').as('dropBox');

    // перетаскивание
    cy.get('@item').first().trigger('dragstart').trigger('dragleave');
    cy.get('@dropBox')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop')
      .trigger('dragend');

    // счетчик в ингредиентах
    cy.get('@item').find('[class*=counter]').should('contain', '2');

    // сравнение пертаскиваемого и положенного в конструктор
    let imgUrlItem = '';
    let imgUrlTopItemDrop = '';
    let imgUrlBottomItemDrop = '';
    let nameItem = '';
    let nameTopItemDrop = '';
    let nameBottomItemDrop = '';

    cy.get('[class*=constructor-element_pos_top]').as('bunTop');
    cy.get('[class*=constructor-element_pos_bottom]').as('bunBottom');

    cy.get('@item')
      .find('img')
      .then(($img) => {
        imgUrlItem = $img.attr('src');
        nameItem = $img.attr('alt');
      });

    cy.get('@bunTop')
      .find('img')
      .then(($img) => {
        imgUrlTopItemDrop = $img.attr('src');
        nameTopItemDrop = $img.attr('alt');
        expect(imgUrlItem).to.equal(imgUrlTopItemDrop);
      });

    cy.get('@bunBottom')
      .find('img')
      .then(($img) => {
        imgUrlBottomItemDrop = $img.attr('src');
        nameBottomItemDrop = $img.attr('alt');
        expect(imgUrlItem).to.equal(imgUrlBottomItemDrop);
      });

    // измение цены
    let price = 0;
    let totalPrice = 0;
    cy.get('@item').find('[class^=burger-item_price__]').as('price');
    cy.get('[class*=totalPrice]').children().as('totalPrice');
    
    cy.get('@price')
      .then(($price) => {
        price = parseInt($price.text());
      });
      cy.get('@totalPrice')
      .then(($total) => {
        totalPrice = parseInt($total.text());
        expect(totalPrice).to.equal(price*2);
      });
  });
});
