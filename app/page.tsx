"use client";

import { redirect } from "next/navigation";

import styles from "./page.module.css";

const serverEndpoint = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;
const serverVersion = process.env.NEXT_PUBLIC_SERVER_VERSION;
const serverMethod = process.env.NEXT_PUBLIC_SERVER_METHOD;
const serverUrl = `${serverMethod}://${serverEndpoint}/${serverVersion}`;

export default function Home() {
  // WebSocket URL https://slurp-dev.deno.dev/v1/socket/
  // const ws = new WebSocket('https://slurp-dev.deno.dev/v1/socket/')

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const sessionShort = event.currentTarget.roomcode.value;
    const sessionUrl = `${serverUrl}/session/entity/shortcode/${sessionShort}`;
    const sessionFetch = await fetch(sessionUrl);

    if (sessionFetch.ok) {
      const sessionJson = await sessionFetch.json();
      const sessionUuid = sessionJson.uuid;

      redirect(`/${sessionUuid}`);
    } else {
    }
  }

  return (
    <main className={styles.room}>
      <h1 className={styles.room__title}>Let's find out who's dying tonight</h1>
      <form onSubmit={onSubmit}>
        <input type="text" name="roomcode" placeholder="What's the roomcode?" />
        <input type="submit" value="submit" />
      </form>
    </main>
  );
}
