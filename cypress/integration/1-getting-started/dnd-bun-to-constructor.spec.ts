
describe('dnd bun to constructor', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });
  it('dnd bun', function () {
cy.addBun()

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
        expect(imgUrlItem).to.equal(imgUrlTopItemDrop);
      });

    cy.get('@bunBottom')
      .find('img')
      .then(($img) => {
        imgUrlBottomItemDrop = $img.attr('src')!;
        expect(imgUrlItem).to.equal(imgUrlBottomItemDrop);
      });
  });
});
