/// <reference types="cypress" />
// @ts-check

describe('service is available', function() {
    it('should be available on localhost:3000', function() {
      cy.visit(Cypress.env('host'));
    });
    it("Should render item ingredient", () => {
        cy.get('[class*=burger-item]');
      });
  }); 