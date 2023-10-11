export type PlayerProps = {
  [key: string]: string | number;
};

export interface Player {
  name: string;
  props: PlayerProps;
}
