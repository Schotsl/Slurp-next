"use client";

import { redirect } from "next/navigation";

import Loader from "@/components/Loader";
import InputSubmit from "@/components/Input/Submit";
import InputText from "@/components/Input/Text";

import styles from "./page.module.scss";

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
      <h1 className={styles.room__title}>
        <span>Let's find out who's dying tonight</span>
      </h1>
      <form className={styles.room__form} onSubmit={onSubmit}>
        <Loader />
        <InputText />
        <InputSubmit />
      </form>
    </main>
  );
}
