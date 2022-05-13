import ArtLoader from "components/common/ArtLoader";
import Button from "components/common/Button";
import { abi, privateMarketAddress } from "constant";
import { ethers } from "ethers";
import getAccount from "helpers/getAccount";
import Router from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./index.module.scss";

type Props = {
  publishedArt?: string;
};

const PublicList: React.FC<Props> = ({ publishedArt }) => {
  const [loading, setLoading] = useState(false);
  const [arts, setArts] = useState<any[]>([]);

  const getArtworks = async () => {
    setLoading(true);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(privateMarketAddress, abi, provider);
    const tokensData = await contract.getAllTokenData();

    setArts(tokensData);

    setLoading(false);
  };

  useEffect(() => {
    getArtworks();
  }, [publishedArt]);

  const purchaseNFT = async (tokenId: any) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(privateMarketAddress, abi, signer);
      await contract.purchaseToken(tokenId);

      setLoading(false);
    } catch (e) {
      setLoading(false);
      alert("You must be logged in to purchase this NFT");
      console.log(e);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__title}>Community NFT Artworks</div>
      <div className={styles.container__subtitle}>
        Purchase one of our community NFT to join our community
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
                onClick={() => Router.push("/a/1")}
              />

              <div className={styles.container__list__item__name}>{art[1]}</div>

              <div className={styles.container__list__item__price}>
                {ethers.utils.formatUnits(art[0], "ether")} ETH
              </div>

              <Button
                className={styles.container__list__item__buy}
                title="BUY"
                onClick={() => purchaseNFT(art[3])}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PublicList;
