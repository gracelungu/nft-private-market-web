import authenticate from "helpers/authenticate";
import useAccountConnection from "hooks/useAccountConnection";
import Link from "next/link";
import Router from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
import accountAtom from "state/atoms/account";
import formatAddress from "utils/formatAddress";
import Button from "../Button";
import styles from "./styles.module.scss";

function Header() {
  const [account] = useRecoilState(accountAtom);
  const { isConnected } = useAccountConnection();

  const onClick = () => {
    if (account) {
      return Router.push("/artworks");
    }

    authenticate();
  };

  return (
    <div className={styles.container}>
      <Link href="/">
        <a>
          <span className={styles.container__logo}>NFTGATE (Ropsten Testnet)</span>
        </a>
      </Link>
      <Button
        title={account ? formatAddress(account) : "Login with Metamask"}
        onClick={onClick}
      ></Button>
    </div>
  );
}

export default Header;
