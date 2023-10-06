import { BattlePageObject } from '../support/battlePage';

const battlePage = new BattlePageObject();

describe('Battle page', () => {
  before(() => {
    cy.visit('/battle?type=people');
  });

  it('user can reset count', () => {
    cy.intercept('https://swapi.tech/api/people', {
      fixture: 'people',
    }).as('getPeople');

    cy.intercept('https://swapi.tech/api/people/1', {
      fixture: 'people1',
    }).as('getPeople1');

    cy.intercept('https://swapi.tech/api/people/2', {
      fixture: 'people2',
    }).as('getPeople2');

    cy.wait(['@getPeople', '@getPeople1', '@getPeople2']);

    cy.resetWinCount();
  });
});
