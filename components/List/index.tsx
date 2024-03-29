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
  const [arts, setArts] = useState<any[]>([]);

  const getArtworks = async () => {
    setLoading(true);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(privateMarketAddress, abi, provider);
    const account = await getAccount();
    const tokens = await contract.getAddressTokens(account);

    const artData = tokens.map(async (token: string) => {
      const data = await contract.getTokenData(token);
      return data;
    });

    const allArts = await Promise.all(artData);
    const artsData = allArts.map((art) => art[0]);

    setArts(artsData.reverse());

    setLoading(false);
  };

  useEffect(() => {
    getArtworks();
  }, [publishedArt]);

  return (
    <div className={styles.container}>
      <div className={styles.container__title}>All your artworks</div>
      <div className={styles.container__subtitle}>
        Published to the community smart contract
      </div>

      <div className={styles.container__list}>
        {loading && <ArtLoader />}

        {!loading && arts.length === 0 && <ArtLoader />}

        {!loading &&
          arts.map((art) => (
            <div key={art[2]} className={styles.container__list__item}>
              <img
                src={art[2]}
                className={styles.container__list__item__image}
                alt="illustration"
              />

              <div className={styles.container__list__item__name}>{art[1]}</div>

              <div className={styles.container__list__item__price}>
                {ethers.utils.formatUnits(art[0], "ether")} ETH
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default List;
