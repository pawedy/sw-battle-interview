import { ApiListItem } from '../models';

export function getRandomId(max: number): number {
  return Math.floor(Math.random() * max);
}

export function generateRandomIdPair(max: number): [number, number] {
  if (max < 2) {
    throw new Error('Cannot find a pair, not enough entries');
  }
  const num1 = getRandomId(max);
  let num2 = getRandomId(max);

  while (num2 === num1) {
    num2 = getRandomId(max);
  }

  return [num1, num2];
}

export function getPairUids(
  playersList: ApiListItem[],
  player1Id: number,
  player2Id: number
): [string, string] {
  const possiblePlayers = playersList.length;
  if (player1Id + 1 > possiblePlayers || player2Id + 1 > possiblePlayers) {
    throw new Error('One or more players are not on the list');
  }
  const player1Uid = playersList[player1Id]?.uid;
  const player2Uid = playersList[player2Id]?.uid;
  return [player1Uid, player2Uid];
}
