import { ApiResource, Players } from '../../enums';
import { ApiListItem, Player } from '../../models';

export interface BattleStateModel {
  resourceType: ApiResource;
  resourceCount: number;
  resourceList: ApiListItem[];
  player1: Player | null;
  player2: Player | null;
  winner: Players | null;
  player1Wins: number;
  player2Wins: number;
}
