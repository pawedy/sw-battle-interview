import { Injectable, inject } from '@angular/core';

import { combineLatest, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ApiService } from '../../services';
import { Battle } from './battle.actions';
import { BattleStateModel } from './battle.model';
import { ApiResource, Players } from '../../enums';
import { generateRandomIdPair, getPairUids } from '../../utils';
import { Api, Player } from '../../models';

const defaults: BattleStateModel = {
  resourceType: ApiResource.PEOPLE,
  resourceCount: 0,
  resourceList: [],
  player1: null,
  player2: null,
  winner: null,
  player1Wins: 0,
  player2Wins: 0,
};

@State<BattleStateModel>({
  name: 'battle',
  defaults,
})
@Injectable()
export class BattleState {
  private apiService: Api<Player> = inject(ApiService);

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
    const { resourceType, resourceCount } = state;

    if (payload.resourceType !== resourceType || !resourceCount) {
      ctx.setState({ ...defaults, resourceType: payload.resourceType });
      return ctx
        .dispatch(new Battle.FetchResourceList({ resourceType }))
        .pipe(switchMap(() => ctx.dispatch(new Battle.StartNewMatch())));
    }
    return ctx.dispatch(new Battle.StartNewMatch());
  }

  @Action(Battle.StartNewMatch)
  startNewMatch(ctx: StateContext<BattleStateModel>) {
    const state = ctx.getState();
    const { resourceCount, resourceList } = state;
    const [player1Id, player2Id] = generateRandomIdPair(resourceCount);
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
      resourceCount: payload.list.total_records,
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
      player1: { ...payload.player1 },
      player2: { ...payload.player2 },
    });
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
      winner: Players.PLEYER1,
      player1Wins: player1Wins + 1,
    });
  }

  @Action(Battle.Player2Wins)
  player2Wins(ctx: StateContext<BattleStateModel>) {
    const { player2Wins } = ctx.getState();
    ctx.patchState({
      winner: Players.PLAYER2,
      player2Wins: player2Wins + 1,
    });
  }

  @Action(Battle.PlayersDraw)
  playersDraw(ctx: StateContext<BattleStateModel>) {
    ctx.patchState({
      winner: null,
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
  static winCount({ player1Wins, player2Wins }: BattleStateModel) {
    return { player1Wins, player2Wins };
  }
}
