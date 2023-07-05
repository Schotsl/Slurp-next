import { Inter, Roboto, Roboto_Slab } from "next/font/google";

import styles from "@/app/layout.module.scss";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const robotSlab = Roboto_Slab({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto-slab",
});

export const metadata = {
  title: "Slurp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${styles.layout}`} lang="en">
      <body
        className={`${styles.layout__body} ${roboto.className} ${robotSlab.className}`}
      >
        {children}
      </body>
    </html>
  );
}
