export interface SlurpConsumable {
  sips: number;
  shots: number;
}

export interface SlurpPlayer {
  uuid: string;
  taken: SlurpConsumable;
  session: string;
  created: string;
  updated: string;
  username: string;
  giveable: SlurpConsumable;
  remaining: SlurpConsumable;
}

export interface SlurpBar {
  player_username: string;
  player_uuid: string;
  sips_consumed: number;
  sips_to_consume: number;
}

export interface SlurpGraph {
  player_username: string;
  player_uuid: string;
  timestamp_utc: string;
  units_consumed: string;
  units_consume: string;
}
