import React from "react";
import Image from "next/image";
import styles from "./index.module.scss";
import Button from "components/common/Button";

function Landing() {
  return (
    <div className={styles.container}>
      <div className={styles.container__left}>
        <img
          className={styles.container__left__image}
          src="/assets/images/illustration.png"
          alt="illustration"
        />
      </div>
      <div className={styles.container__right}>
        <div className={styles.container__right__title}>
          Create and share your NFT artwork with your fans
        </div>

        <div className={styles.container__right__subtitle}>
          Keep all your top notch NFT artwork in one place, generate a custom
          page and share with your community
        </div>

        <Button
          className={styles.container__right__button}
          title="Get Started"
        />
      </div>
    </div>
  );
}

export default Landing;
