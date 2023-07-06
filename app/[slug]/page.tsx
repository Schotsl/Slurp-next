"use client";

import { useState } from "react";

import styles from "./page.module.scss";

import PlayerBars from "@/components/Player/PlayerBars";
import PlayerGraph from "@/components/Player/PlayerGraph";
import PlayerTable from "@/components/Player/PlayerTable";

// https://slurp-dev.deno.dev/v1/socket/session/07f60c96-e367-4c84-bd99-6ee3d1f717db

export default function Preview() {
  const [players, setPlayers] = useState([]);

  const socket = new WebSocket(
    "wss://slurp-dev.deno.dev/v1/socket/session/07f60c96-e367-4c84-bd99-6ee3d1f717db",
  );

  socket.addEventListener("open", function (event) {
    // socket.send("Hello Server!");
  });

  socket.addEventListener("message", function (event) {
    const data = JSON.parse(event.data);
    setPlayers(data);
  });

  return (
    <div className={styles.overview}>
      <div className={styles.overview__row}>
        <div className={styles.overview__cell}>
          <h2>Players</h2>
          <PlayerTable players={players} />
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
