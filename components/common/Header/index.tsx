import Link from "next/link";
import React from "react";
import Button from "../Button";
import styles from "./styles.module.scss";

function Header() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a>
          <span className={styles.container__logo}>TOP-NOTCH</span>
        </a>
      </Link>
      <Button title="Login with Metamask"></Button>
    </div>
  );
}

export default Header;
