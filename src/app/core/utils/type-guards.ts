import { Player } from '../models';

export const isPlayer = (
  player: Player | null | undefined
): player is Player => {
  return (
    (player as Player)?.name !== undefined &&
    (player as Player)?.props !== undefined
  );
};
