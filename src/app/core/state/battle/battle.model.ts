import { ApiResourceType, Winner } from '../../enums';
import { ApiListItem, Player } from '../../models';

export interface BattleStateModel {
  resourceType: ApiResourceType;
  resourceList: ApiListItem[];
  player1: Player | null;
  player2: Player | null;
  winner: Winner;
  player1Wins: number;
  player2Wins: number;
  error: Error | null;
}
