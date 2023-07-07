"use client";

import { useState } from "react";

import Loader from "@/components/Loader";
import Marquee from "@/components/Marquee";

import InputText from "@/components/Input/Text";
import InputSubmit from "@/components/Input/Submit";

import styles from "./page.module.scss";

const serverEndpoint = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;
const serverVersion = process.env.NEXT_PUBLIC_SERVER_VERSION;
const serverMethod = process.env.NEXT_PUBLIC_SERVER_METHOD;
const serverUrl = `${serverMethod}://${serverEndpoint}/${serverVersion}`;

export default function Home() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // If nothing has been provided
    if (!event.currentTarget.roomcode.value) {
      setError("Please enter a room code");
      return;
    }

    const sessionShort = event.currentTarget.roomcode.value;
    const sessionRegexp = /^[a-z]+-[a-z]+-\d{3}$/i;

    // We'll make sure that the room code is following valid formatting
    if (!sessionRegexp.test(sessionShort)) {
      setError("It appears that this room code is invalid");
      return;
    }

    setLoading(true);

    const sessionUrl = `${serverUrl}/session/entity/shortcode/${sessionShort}`;
    const sessionFetch = await fetch(sessionUrl);

    if (sessionFetch.ok) {
      const sessionJson = await sessionFetch.json();
      const sessionUuid = sessionJson.uuid;

      window.location.replace(`/${sessionUuid}`);
    } else {
      setError("It appears that this room does not exist");
      setLoading(false);
    }
  }

  return (
    <main className={styles.room}>
      <Marquee />
      <form className={styles.room__form} onSubmit={onSubmit}>
        {loading && <Loader />}

        <InputText
          name="roomcode"
          label="Room code"
          error={error}
          disabled={loading}
          placeholder="Enter your room code"
        />

        <InputSubmit value="Let's go!" disabled={loading} />
      </form>
    </main>
  );
}
