"use client";

import styles from "./InputText.module.scss";

type InputTextProps = {
  name: string;
  label: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
};

export default function InputText({
  name,
  label,
  error,
  disabled,
  placeholder,
}: InputTextProps) {
  const textClasses = error
    ? `${styles["text__input"]} ${styles["text__input--error"]}`
    : `${styles["text__input"]}`;

  return (
    <div className={styles.text}>
      <label className={styles.text__label} htmlFor={name}>
        {label}
      </label>

      <input
        id={name}
        type="text"
        name={name}
        disabled={disabled}
        className={textClasses}
        placeholder={placeholder}
      />

      <label className={styles.text__error}>{error}</label>
    </div>
  );
}
