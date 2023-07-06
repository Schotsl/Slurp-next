"use client";

import styles from "./InputText.module.scss";

type InputTextProps = {
  name: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
};

export default function InputText({
  name,
  error,
  disabled,
  placeholder,
}: InputTextProps) {
  const textClasses = error
    ? `${styles["text"]} ${styles["text--error"]}`
    : `${styles["text"]}`;

  return (
    <input
      type="text"
      name={name}
      disabled={disabled}
      className={textClasses}
      placeholder={placeholder}
    />
  );
}
