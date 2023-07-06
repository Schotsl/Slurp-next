import React from "react";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";

import styles from "./PlayerTable.module.scss";

import { Player } from "@/types";

interface Prop {
  players: Player[];
}

export default function PlayerTable({ players }: Prop) {
  const minecraftFace = (username: string) => {
    return `https://mc-heads.net/avatar/${username}/64`;
  };

  // Check if name ends with s and then place ' in front of it and add string, an example is "Sjors' profile picture" or "Martin's profile picture"
  const minecraftAlt = (username: string) => {
    if (username.endsWith("s")) {
      return `${username}' profile picture`;
    } else {
      return `${username}'s profile picture`;
    }
  };

  const tableRef = useRef<HTMLDivElement>(null);

  const [scrollDirection, setScrollDirection] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (tableRef.current) {
        if (
          tableRef.current.scrollTop + tableRef.current.clientHeight >=
          tableRef.current.scrollHeight
        ) {
          setScrollDirection(-15);
        } else if (tableRef.current.scrollTop === 0) {
          setScrollDirection(15);
        }

        tableRef.current.scrollTop += scrollDirection;
      }
    }, 100);

    return () => {
      // This is necessary to avoid memory leaks
      clearInterval(intervalId);
    };
  }, [scrollDirection]);

  return (
    <div className={styles.container} ref={tableRef}>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr className={styles.row}>
            <th className={styles.cell}></th>
            <th className={styles.cell}>Player</th>
            <th className={styles.cell}>To-take sips</th>
            <th className={styles.cell}>To-take shots</th>
            <th className={styles.cell}>Taken sips</th>
            <th className={styles.cell}>Taken shots</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {players.map((player) => (
            <tr key={player.uuid} className={styles.row}>
              <td className={styles.cell}>
                <Image
                  src={minecraftFace(player.username)}
                  alt={minecraftAlt(player.username)}
                  width={28}
                  height={28}
                  className={styles.avatar}
                />
              </td>
              <td className={styles.cell}>{player.username}</td>
              <td className={styles.cell}>{player.remaining.sips}</td>
              <td className={styles.cell}>{player.remaining.shots}</td>
              <td className={styles.cell}>{player.taken.sips}</td>
              <td className={styles.cell}>{player.taken.shots}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
