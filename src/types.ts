export interface Consumable {
  sips: number;
  shots: number;
}

export interface Timeslice {
  time?: string | undefined;
  taken: Consumable;
  giveable?: boolean | undefined;
  remaining: Consumable;
}

export interface Player {
  uuid: string,
  username: string,
  sips: number,
  shots: number,
}
