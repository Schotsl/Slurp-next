"use client";

import styles from "./Marquee.module.scss";

const phrases = [
  "Let's find out who's dying tonight",
  "Don't mine and drink!",
  "Creeper? I hardly knew her!",
  "I'm not drunk, the room is spinning",
  "The Ender Dragon is easier when you're tipsy",
  "Every time you fall in lava, take a shot",
  "My pickaxe can mine more than just blocks",
  "I promise I won't drunk dial my ex... again",
  "Remember: don't drink and redstone",
  "Who needs a health potion when you've got beer?",
];

export default function Marquee() {
  return (
    <div className={styles.marquee}>
      <ul className={styles.marquee__list}>
        {phrases.map((phrase, index) => (
          <li className={styles.marquee__list__item} key={index}>
            {phrase}
          </li>
        ))}
      </ul>

      <ul className={styles.marquee__list} aria-hidden="true">
        {phrases.map((phrase, index) => (
          <li className={styles.marquee__list__item} key={index}>
            {phrase}
          </li>
        ))}
      </ul>
    </div>
  );
}
