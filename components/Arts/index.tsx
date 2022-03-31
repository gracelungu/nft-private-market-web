import Create from "components/Create";
import List from "components/List";
import React from "react";
import styles from "./index.module.scss";

function Arts() {
  return (
    <div className={styles.container}>
      <Create />
      <List />
    </div>
  );
}

export default Arts;
