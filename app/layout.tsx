import "@/styles/variables.scss";

import styles from "@/app/layout.module.scss";

export const metadata = {
  title: "Slurp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={styles.layout} lang="en">
      <body className={styles.layout__body}>{children}</body>
    </html>
  );
}
