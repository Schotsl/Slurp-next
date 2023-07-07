"use client";

import { useState } from "react";

import styles from "./page.module.scss";

import PlayerBars from "@/components/Player/PlayerBars";
import PlayerGraph from "@/components/Player/PlayerGraph";
import PlayerTable from "@/components/Player/PlayerTable";

// https://slurp-dev.deno.dev/v1/socket/session/07f60c96-e367-4c84-bd99-6ee3d1f717db

const serverEndpoint = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;
const serverVersion = process.env.NEXT_PUBLIC_SERVER_VERSION;
const serverSocket = process.env.NEXT_PUBLIC_SERVER_SOCKET;
const serverUrl = `${serverSocket}://${serverEndpoint}/${serverVersion}`;

type PreviewProps = {
  params: { slug: string };
};

export default function Preview({ params }: PreviewProps) {
  const [players, setPlayers] = useState([]);
  const [graph, setGraph] = useState([]);
  const [bars, setBars] = useState([]);

  const sessionSocket = new WebSocket(
    `${serverUrl}/socket/session/${params.slug}`,
  );

  const graphSocket = new WebSocket(`${serverUrl}/socket/graph/${params.slug}`);

  const barsSocket = new WebSocket(`${serverUrl}/socket/bars/${params.slug}`);

  sessionSocket.addEventListener("message", function (event) {
    const data = JSON.parse(event.data);
    setPlayers(data);
  });

  graphSocket.addEventListener("message", function (event) {
    const data = JSON.parse(event.data);
    console.log(data);
  });

  barsSocket.addEventListener("message", function (event) {
    const data = JSON.parse(event.data);
    console.log(data);
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
