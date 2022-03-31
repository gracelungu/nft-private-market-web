import React from "react";
import styles from "./index.module.scss";

function List() {
  return (
    <div className={styles.container}>
      <div className={styles.container__title}>All your artworks</div>
      <div className={styles.container__subtitle}>
        Published to the Binance smart chain
      </div>

      <div className={styles.container__list}>
        <img
          src="assets/images/art.jpg"
          className={styles.container__list__item}
          alt="illustration"
        />

        <img
          src="assets/images/art.jpg"
          className={styles.container__list__item}
          alt="illustration"
        />

        <img
          src="assets/images/art.jpg"
          className={styles.container__list__item}
          alt="illustration"
        />

        <img
          src="assets/images/art.jpg"
          className={styles.container__list__item}
          alt="illustration"
        />

        <img
          src="assets/images/art.jpg"
          className={styles.container__list__item}
          alt="illustration"
        />

        <img
          src="assets/images/art.jpg"
          className={styles.container__list__item}
          alt="illustration"
        />
      </div>
    </div>
  );
}

export default List;
