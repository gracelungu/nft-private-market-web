import React from "react";
import Image from "next/image";
import styles from "./index.module.scss";
import Button from "components/common/Button";
import Router from "next/router";
import useAccountConnection from "hooks/useAccountConnection";
import authenticate from "helpers/authenticate";
import { useRecoilState } from "recoil";
import accountAtom from "state/atoms/account";

function Landing() {
  const [account] = useRecoilState(accountAtom);
  const { isConnected, setAccountsState } = useAccountConnection();

  const onAccounts = async () => {
    if (account) {
      return Router.push("/artworks");
    }

    await authenticate();
    setAccountsState();
  };

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
          Create and share your NFT artwork with our community
        </div>

        <div className={styles.container__right__subtitle}>
          Join our community by purchasing one of our NFTs, and earn a special
          access to list your own NFTs on the platform
        </div>

        <Button
          className={styles.container__right__button}
          title={account ? "PUBLISH YOUR ARTWORK" : "GET STARTED"}
          onClick={onAccounts}
        />
      </div>
    </div>
  );
}

export default Landing;
