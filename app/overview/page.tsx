"use client";

import styles from "./page.module.css";

import PlayerBars from "@/components/PlayerBars";
import PlayerGraph from "@/components/PlayerGraph";
import PlayerTable from "@/components/PlayerTable";

export default function Preview() {
  // WebSocket URL https://slurp-dev.deno.dev/v1/socket/
  // const ws = new WebSocket('https://slurp-dev.deno.dev/v1/socket/')

  return (
    <div className={styles.overview}>
      <div className={styles.overview__row}>
        <div className={styles.overview__cell}>
          <h2>Players</h2>
          <PlayerGraph />
        </div>
        <div className={styles.overview__cell}>
          <h2>Shots</h2>
          <PlayerGraph />
        </div>
      </div>

      <div className={styles.overview__row}>
        <div className={styles.overview__cell}>
          <h2>Total</h2>
          <PlayerBars />
        </div>
        <div className={styles.overview__cell}>
          <h2>Sips</h2>
          <PlayerGraph />
        </div>
      </div>
    </div>
  );
}
