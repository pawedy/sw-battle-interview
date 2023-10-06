import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { BattleState } from './battle.state';
import { BattleStateModel } from './battle.model';
import { ApiResourceType, Winner } from '../../enums';
import { peopleMockItems, peopleMockList } from '../../../../test-mocks';
import { Battle } from './battle.actions';
import { ApiService } from '../../services';
import { Resource } from '../../models';
import { HttpClientModule } from '@angular/common/http';
import { firstValueFrom, of } from 'rxjs';
import { mapResourceToPlayer } from '../../utils';

export const TEST_STATE: BattleStateModel = {
  resourceType: ApiResourceType.PEOPLE,
  resourceList: peopleMockList.results,
  player1: mapResourceToPlayer(peopleMockItems[0].result.properties),
  player2: mapResourceToPlayer(peopleMockItems[1].result.properties),
  winner: Winner.PLAYER1,
  player1Wins: 1,
  player2Wins: 0,
};

describe('Battle state', () => {
  let store: Store;
  let apiService: ApiService<Resource>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([BattleState]), HttpClientModule],
    });

    apiService = TestBed.inject(ApiService);

    store = TestBed.inject(Store);
    store.reset({
      ...store.snapshot(),
      BattleState: TEST_STATE,
    });
  });

  it('it initiates the battle with players', async () => {
    apiService = TestBed.inject(ApiService);
    spyOn(apiService, 'getItems').and.returnValue(of(peopleMockList));
    spyOn(apiService, 'getItem').and.returnValue(
      of(peopleMockItems[0], peopleMockItems[1])
    );
    await firstValueFrom(
      store.dispatch(
        new Battle.InitiateBattle({ resourceType: ApiResourceType.PEOPLE })
      )
    );
    const players = store.selectSnapshot(BattleState.players);

    expect(players.player1).toBeTruthy();
    expect(players.player2).toBeTruthy();

    const mockNames = [
      peopleMockItems[0].result.properties.name,
      peopleMockItems[1].result.properties.name,
    ];
    const correctPlayers =
      mockNames.includes(players.player1?.name as string) &&
      mockNames.includes(players.player2?.name as string);

    expect(correctPlayers).toBe(true);
  });
});
