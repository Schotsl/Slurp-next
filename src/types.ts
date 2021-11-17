export interface Consumable {
  sips: number;
  shots: number;
}

export interface Timeslice {
  hour?: string | undefined;
  taken: Consumable;
  remaining: Consumable;
}

export interface Player {
  uuid: string;
  server: string;
  username: string;
  timeline: Timeslice[];
}
