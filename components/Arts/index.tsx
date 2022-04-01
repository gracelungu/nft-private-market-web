import Create from "components/Create";
import List from "components/List";
import React from "react";
import styles from "./index.module.scss";

function Arts() {
  const [artwork, setArtwork] = React.useState<string>();

  const onPublished = (url: string) => {
    setArtwork(url);
  };

  return (
    <div className={styles.container}>
      <Create onPublished={onPublished} />
      <List publishedArt={artwork} />
    </div>
  );
}

export default Arts;
