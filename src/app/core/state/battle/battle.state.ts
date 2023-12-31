import { Injectable, inject } from '@angular/core';

import { combineLatest, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ApiService } from '../../services';
import { Battle } from './battle.actions';
import { BattleStateModel } from './battle.model';
import { ApiResourceType, Winner } from '../../enums';
import {
  generateRandomIdPair,
  getPairUids,
  isPlayer,
  mapResourceToPlayer,
  parseAttrToNumber,
} from '../../utils';
import { Api } from '../../models';
import { WIN_DETERMINANTS } from '../../constants';

const defaults: BattleStateModel = {
  resourceType: ApiResourceType.PEOPLE,
  resourceList: [],
  player1: null,
  player2: null,
  winner: Winner.DRAW,
  player1Wins: 0,
  player2Wins: 0,
  error: null,
};

@State<BattleStateModel>({
  name: 'battle',
  defaults,
})
@Injectable()
export class BattleState {
  private apiService: Api = inject(ApiService);

  @Action(Battle.SetResourceType)
  setResourceType(
    ctx: StateContext<BattleStateModel>,
    { payload }: Battle.SetResourceType
  ) {
    const state = ctx.getState();
    if (state.resourceType !== payload.resourceType) {
      ctx.patchState({ resourceType: payload.resourceType });
    }
  }

  @Action(Battle.InitiateBattle)
  initiateBattle(
    ctx: StateContext<BattleStateModel>,
    { payload }: Battle.InitiateBattle
  ) {
    const state = ctx.getState();
    const { resourceType, resourceList } = state;

    if (payload.resourceType !== resourceType || !resourceList.length) {
      ctx.setState({ ...defaults, resourceType: payload.resourceType });
      return ctx
        .dispatch(new Battle.FetchResourceList({ resourceType }))
        .pipe(switchMap(() => ctx.dispatch(new Battle.StartNewMatch())));
    }
    return ctx.dispatch(new Battle.StartNewMatch());
  }

  @Action(Battle.StartNewMatch)
  startNewMatch(ctx: StateContext<BattleStateModel>) {
    try {
      const state = ctx.getState();
      const { resourceList } = state;
      const [player1Id, player2Id] = generateRandomIdPair(resourceList.length);
      const [player1Uid, player2Uid] = getPairUids(
        resourceList,
        player1Id,
        player2Id
      );
      return ctx.dispatch(
        new Battle.FetchPlayers({
          player1Uid,
          player2Uid,
        })
      );
    } catch (error) {
      if (error instanceof Error) {
        ctx.dispatch(new Battle.ThrowError({ error }));
      }
    }
    return;
  }

  @Action(Battle.FetchResourceList)
  fetchResourceCount(ctx: StateContext<BattleStateModel>) {
    const { resourceType } = ctx.getState();
    //fetching with limit 0 will return the whole list
    return this.apiService.getItems(resourceType, 1, 0).pipe(
      map((list) => {
        return ctx.dispatch(
          new Battle.FetchResourceListSuccess({
            list,
          })
        );
      }),
      catchError((error) => {
        return of(
          ctx.dispatch(
            new Battle.ThrowError({
              error: error,
            })
          )
        );
      })
    );
  }

  @Action(Battle.FetchResourceListSuccess)
  fetchResourceCountSuccess(
    ctx: StateContext<BattleStateModel>,
    { payload }: Battle.FetchResourceListSuccess
  ) {
    ctx.patchState({
      resourceList: payload.list.results,
    });
  }

  @Action(Battle.FetchPlayers)
  fetchPlayers(
    ctx: StateContext<BattleStateModel>,
    { payload }: Battle.FetchPlayers
  ) {
    const { resourceType } = ctx.getState();
    return combineLatest([
      this.apiService.getItem(resourceType, payload.player1Uid),
      this.apiService.getItem(resourceType, payload.player2Uid),
    ]).pipe(
      map(([player1Entry, player2Entry]) => {
        const player1 = player1Entry.result.properties;
        const player2 = player2Entry.result.properties;

        return ctx.dispatch(
          new Battle.FetchPlayersSuccess({
            player1,
            player2,
          })
        );
      }),
      catchError((error) => {
        return of(
          ctx.dispatch(
            new Battle.ThrowError({
              error: error,
            })
          )
        );
      })
    );
  }

  @Action(Battle.FetchPlayersSuccess)
  fetchPlayersSuccess(
    ctx: StateContext<BattleStateModel>,
    { payload }: Battle.FetchPlayersSuccess
  ) {
    ctx.patchState({
      player1: mapResourceToPlayer(payload.player1),
      player2: mapResourceToPlayer(payload.player2),
    });

    ctx.dispatch(new Battle.DetermineWinner());
  }

  @Action(Battle.DetermineWinner)
  determineWinner(ctx: StateContext<BattleStateModel>) {
    try {
      const [player1Value, player2Value] =
        this.getPlayerAttValuesToCompare(ctx);
      if (player1Value > player2Value) {
        return of(ctx.dispatch(new Battle.Player1Wins()));
      }
      if (player1Value < player2Value) {
        return of(ctx.dispatch(new Battle.Player2Wins()));
      }
    } catch (error) {
      if (error instanceof Error) {
        ctx.dispatch(new Battle.ThrowError({ error }));
      }
    }

    return of(ctx.dispatch(new Battle.PlayersDraw()));
  }

  @Action(Battle.ResetWinCount)
  resetWinCount(ctx: StateContext<BattleStateModel>) {
    ctx.patchState({
      player1Wins: 0,
      player2Wins: 0,
    });
  }

  @Action(Battle.Player1Wins)
  player1Wins(ctx: StateContext<BattleStateModel>) {
    const { player1Wins } = ctx.getState();
    ctx.patchState({
      winner: Winner.PLAYER1,
      player1Wins: player1Wins + 1,
    });
  }

  @Action(Battle.Player2Wins)
  player2Wins(ctx: StateContext<BattleStateModel>) {
    const { player2Wins } = ctx.getState();
    ctx.patchState({
      winner: Winner.PLAYER2,
      player2Wins: player2Wins + 1,
    });
  }

  @Action(Battle.PlayersDraw)
  playersDraw(ctx: StateContext<BattleStateModel>) {
    ctx.patchState({
      winner: Winner.DRAW,
    });
  }

  @Action(Battle.ThrowError)
  throwError(
    ctx: StateContext<BattleStateModel>,
    { payload }: Battle.ThrowError
  ) {
    console.log(payload.error);
    ctx.patchState({
      error: payload.error,
    });
  }

  @Selector()
  static resourceType({ resourceType }: BattleStateModel) {
    return resourceType;
  }

  @Selector()
  static players({ player1, player2 }: BattleStateModel) {
    return { player1, player2 };
  }

  @Selector()
  static winner({ winner }: BattleStateModel) {
    return winner;
  }

  @Selector()
  static winCount({ player1Wins, player2Wins }: BattleStateModel) {
    return { player1Wins, player2Wins };
  }

  @Selector()
  static error({ error }: BattleStateModel) {
    return error;
  }

  private getPlayerAttValuesToCompare(
    ctx: StateContext<BattleStateModel>
  ): [number, number] {
    const { resourceType } = ctx.getState();
    const { player1, player2 } = ctx.getState();

    if (!isPlayer(player1) || !isPlayer(player2)) {
      throw new Error('At least one of the players is not set');
    }

    const player1Props = player1.props;
    const player2Props = player2.props;

    const propKeyToCompare =
      resourceType === ApiResourceType.PEOPLE
        ? WIN_DETERMINANTS.people
        : WIN_DETERMINANTS.starships;

    const player1Prop = player1Props[propKeyToCompare];
    const player2Prop = player2Props[propKeyToCompare];

    if (player1Prop === undefined || player2Prop === undefined) {
      throw new Error('Cannot compare the players');
    }

    return [parseAttrToNumber(player1Prop), parseAttrToNumber(player2Prop)];
  }
}
