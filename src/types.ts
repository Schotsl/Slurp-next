export interface Consumable {
  sips: number;
  shots: number;
}

export interface Timeslice {
  time?: string | undefined;
  taken: Consumable;
  remaining: Consumable;
}

export interface Player {
  uuid: string;
  color: string;
  server: string;
  username: string;
  timeline: Timeslice[];
}
