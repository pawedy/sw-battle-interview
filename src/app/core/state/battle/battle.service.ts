import { Injectable, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { BattleState } from './battle.state';
import { distinctUntilChanged, filter } from 'rxjs';
import { Battle } from './battle.actions';
import { ApiResourceType } from '../../enums';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  private store = inject(Store);

  public players$ = this.store.select(BattleState.players).pipe(
    filter((players) => !!players?.player1 && !!players?.player2),
    distinctUntilChanged((previous, current) => {
      return (
        previous.player1?.name === current.player1?.name &&
        previous.player2?.name === current.player2?.name
      );
    })
  );

  public winCount$ = this.store.select(BattleState.winCount);

  public resourceType$ = this.store.select(BattleState.resourceType);

  public winner$ = this.store.select(BattleState.winner);

  public initiateBattle(resourceType: ApiResourceType) {
    this.store.dispatch(new Battle.InitiateBattle({ resourceType }));
  }

  public startNewMatch() {
    this.store.dispatch(new Battle.StartNewMatch());
  }

  public resetWins() {
    this.store.dispatch(new Battle.ResetWinCount());
  }

  public player1Wins() {
    this.store.dispatch(new Battle.Player1Wins());
  }

  public player2Wins() {
    this.store.dispatch(new Battle.Player2Wins());
  }
}
