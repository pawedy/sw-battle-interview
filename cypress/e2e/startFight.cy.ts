import { BattlePageObject } from '../support/battlePage';

const battlePage = new BattlePageObject();

describe('Battle page', () => {
  beforeEach(() => {
    cy.intercept('https://swapi.tech/api/people?page=1&limit=0', {
      fixture: 'people',
    }).as('getPeople');

    cy.intercept('https://swapi.tech/api/people/1', {
      fixture: 'people1',
    }).as('getPeople1');

    cy.intercept('https://swapi.tech/api/people/2', {
      fixture: 'people2',
    }).as('getPeople2');
    cy.visit('/battle?type=people');

    cy.wait(['@getPeople', '@getPeople1', '@getPeople2']);
  });

  it('should display players', () => {
    battlePage.playerNames.contains('Luke Skywalker').should('be.visible');
    battlePage.playerNames.contains('C-3PO').should('be.visible');
  });

  it('should reset win count', () => {
    battlePage.playerWinCounts.contains('Won: 1 time').should('be.visible');
    battlePage.playerWinCounts.contains('Won: 0 times').should('be.visible');

    cy.resetWinCount();

    battlePage.playerWinCounts.contains('Won: 1 time').should('not.exist');
    battlePage.playerWinCounts.contains('Won: 0 times').should('be.visible');
  });
});
