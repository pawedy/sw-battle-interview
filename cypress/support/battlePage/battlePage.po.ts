//TODO use data-testid
export class BattlePageObject {
  get newFightButton(): Cypress.Chainable<JQuery> {
    return cy.get('start-battle-button');
  }

  get resetCounterButton(): Cypress.Chainable<JQuery> {
    return cy.get('.reset-wins-button');
  }

  get playerNames(): Cypress.Chainable<JQuery> {
    return cy.get('swb-player-card mat-card-title');
  }

  get playerWinCounts(): Cypress.Chainable<JQuery> {
    return cy.get('.win-count');
  }
}
