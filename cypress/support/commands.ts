/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
import { BattleCommands } from './battlePage';

declare global {
  namespace Cypress {
    interface Chainable extends BattleCommands {}
  }
}
