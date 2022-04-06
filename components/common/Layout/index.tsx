import React from "react";
import Header from "components/common/Header";
import styles from "./index.module.scss";

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.container}>{children}</div>
      </div>
    </>
  );
};

export default Layout;
