/// <reference types="cypress" />
// @ts-check

describe('dnd bun to constructor', function () {
  before(function () {
    cy.visit(Cypress.env('host'));
  });
  it('dnd bun', function () {
    cy.get('[class*=bun]').children().first().as('item');
    cy.get('[class*=panel]').as('dropBox');
    cy.dnd('@item', '@dropBox')

    // счетчик в ингредиентах
    cy.get('@item').find('[class*=counter]').should('contain', '2');

    // сравнение пертаскиваемого и положенного в конструктор
    let imgUrlItem = '';
    let imgUrlTopItemDrop = '';
    let imgUrlBottomItemDrop = '';

    cy.get('[class*=constructor-element_pos_top]').as('bunTop');
    cy.get('[class*=constructor-element_pos_bottom]').as('bunBottom');

    cy.get('@item')
      .find('img')
      .then(($img) => {
        imgUrlItem = $img.attr('src')!;
      });

    cy.get('@bunTop')
      .find('img')
      .then(($img) => {
        imgUrlTopItemDrop = $img.attr('src')!;
        // @ts-ignore
        expect(imgUrlItem).to.equal(imgUrlTopItemDrop);
      });

    cy.get('@bunBottom')
      .find('img')
      .then(($img) => {
        imgUrlBottomItemDrop = $img.attr('src')!;
        // @ts-ignore
        expect(imgUrlItem).to.equal(imgUrlBottomItemDrop);
      });
  });
});

