import ArtLoader from "components/common/ArtLoader";
import { abi, privateMarketAddress } from "constant";
import { ethers } from "ethers";
import getAccount from "helpers/getAccount";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./index.module.scss";

type Props = {
  publishedArt?: string;
};

const List: React.FC<Props> = ({ publishedArt }) => {
  const [loading, setLoading] = useState(false);
  const [arts, setArts] = useState<string[]>([]);

  const getArtworks = async () => {
    setLoading(true);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(privateMarketAddress, abi, provider);
    const account = await getAccount();
    const tokens = await contract.getAddressTokens(account);

    const artURIs = tokens.map(async (token: string) => {
      const URI = await contract.tokenURI(token);
      return URI;
    });

    const images = await Promise.all(artURIs);

    setArts(images.reverse());

    setLoading(false);
  };

  useEffect(() => {
    getArtworks();
  }, [publishedArt]);

  return (
    <div className={styles.container}>
      <div className={styles.container__title}>All your artworks</div>
      <div className={styles.container__subtitle}>
        Published to the Binance smart chain
      </div>

      <div className={styles.container__list}>
        {loading && <ArtLoader />}

        {!loading &&
          arts.map((art) => (
            <img
              src={art}
              className={styles.container__list__item}
              alt="illustration"
            />
          ))}
      </div>
    </div>
  );
};

export default List;
