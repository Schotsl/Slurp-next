"use client";

import styles from "./InputText.module.scss";

export default function InputText() {
  return (
    <input
      className={styles.text}
      type="text"
      name="roomcode"
      placeholder="What's the roomcode?"
    />
  );
}
