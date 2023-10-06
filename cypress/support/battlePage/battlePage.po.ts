export class BattlePageObject {
  get newFightButton(): Cypress.Chainable<JQuery> {
    return cy.get('[data-testid="new-fight-button"]');
  }

  get resetCounterButton(): Cypress.Chainable<JQuery> {
    return cy.get('[data-testid="reset-counter-button"]');
  }
}
