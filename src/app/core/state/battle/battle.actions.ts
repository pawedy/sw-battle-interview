/* eslint-disable @typescript-eslint/no-namespace */
import { ApiResourceType } from '../../enums';
import { ApiList, EntryProperties } from '../../models';

export namespace Battle {
  export class SetResourceType {
    static readonly type = '[API] Set Resource Type';
    constructor(public payload: { resourceType: ApiResourceType }) {}
  }

  export class InitiateBattle {
    static readonly type = '[API] Initiate battle';
    constructor(public payload: { resourceType: ApiResourceType }) {}
  }

  export class StartNewMatch {
    static readonly type = '[Battle] Start New Match';
  }

  export class FetchResourceList {
    static readonly type = '[Battle] Fetch Resource List';
    constructor(public payload: { resourceType: ApiResourceType }) {}
  }

  export class FetchResourceListSuccess {
    static readonly type = '[Battle] Fetch Resource List Success';
    constructor(public payload: { list: ApiList }) {}
  }

  export class FetchPlayers {
    static readonly type = '[Battle] Fetch Players';
    constructor(public payload: { player1Uid: string; player2Uid: string }) {}
  }

  export class FetchPlayersSuccess {
    static readonly type = '[Battle] Fetch Players Success';
    constructor(
      public payload: { player1: EntryProperties; player2: EntryProperties }
    ) {}
  }

  export class DetermineWinner {
    static readonly type = '[Battle] Determine Winner';
  }

  export class Player1Wins {
    static readonly type = '[Battle] Player 1 Wins';
  }

  export class Player2Wins {
    static readonly type = '[Battle] Player 2 Wins';
  }

  export class PlayersDraw {
    static readonly type = '[Battle] Players draw';
  }

  export class ResetWinCount {
    static readonly type = '[Battle] Reset Win Count';
  }

  //simplified error handling for the purpose of the excercise
  export class ThrowError {
    static readonly type = '[Battle] Battle failed';
    constructor(public payload: { error: Error }) {}
  }
}
