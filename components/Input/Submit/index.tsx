"use client";

import styles from "./InputSubmit.module.scss";

export default function InputSubmit() {
  return (
    <input className={styles.submit} type="submit" value="Let's get started" />
  );
}
