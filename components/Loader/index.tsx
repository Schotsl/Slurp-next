"use client";

import styles from "./Loader.module.scss";

export default function Loader() {
  return (
    <div className={styles.loader}>
      <span className={styles.loader__spinner}></span>
    </div>
  );
}
