"use client";

import styles from "./InputSubmit.module.scss";

type InputSubmitProps = {
  value: string;
  disabled?: boolean;
};

export default function InputSubmit({ value, disabled }: InputSubmitProps) {
  return (
    <input
      type="submit"
      value={value}
      disabled={disabled}
      className={styles.submit}
    />
  );
}
