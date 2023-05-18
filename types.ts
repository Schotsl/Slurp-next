export interface Consumable {
  sips: number;
  shots: number;
}

export interface Player {
  uuid: string;
  taken: Consumable;
  session: string;
  created: string;
  updated: string;
  username: string;
  giveable: Consumable;
  remaining: Consumable;
}