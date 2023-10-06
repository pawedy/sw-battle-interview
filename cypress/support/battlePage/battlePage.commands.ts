import { BattlePageObject } from './battlePage.po';

export interface BattleCommands {
  startNewFight(): void;
  resetWinCount(): void;
}

const battlePage = new BattlePageObject();

Cypress.Commands.add('startNewFight', () => {
  battlePage.newFightButton.click();
});
