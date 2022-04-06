import { useState } from "react";
import Button from "components/common/Button";
import Input from "components/common/Input";
import React from "react";
import styles from "./index.module.scss";
import { ethers } from "ethers";
import { abi, privateMarketAddress } from "constant";
import { useRouter } from "next/router";
import { useEffect } from "react";

function ArtPage() {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState<string>();
  const [commentMessage, setCommentMessage] = useState<string>();
  const router = useRouter();
  const { tokenId } = router.query;
  const [loading, setLoading] = useState(false);
  const [art, setArt] = useState<any[]>([]);

  const getArtwork = async () => {
    setLoading(true);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(privateMarketAddress, abi, provider);
    const data = await contract.getTokenData(tokenId);

    setArt(data[0]);

    setLoading(false);
  };

  const purchaseNFT = async (tokenId: any) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(privateMarketAddress, abi, signer);
      await contract.purchaseToken(tokenId);

      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const comment = async () => {
    try {
      setLoading(true);
      const date = new Date().toDateString();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(privateMarketAddress, abi, signer);
      await contract.createMessage(tokenId, commentMessage, date);
      setLoading(false);
    } catch (e) {
      setError(
        "You do not belong to the community yet. You must own one of our NFTs to comment."
      );
      setLoading(false);
    }
  };

  const getMessages = async () => {
    setLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(privateMarketAddress, abi, signer);
    const messages = await contract.getMessages(tokenId);
    setComments(messages);
    setLoading(false);
  };

  useEffect(() => {
    getArtwork();
    getMessages();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container__left}>
        <div>
          <div className={styles.container__left__title}>{art[1]}</div>
          <div className={styles.container__left__subtitle}>
            {art[0] ? ethers.utils.formatUnits(art[0], "ether") : ""} ETH
          </div>
        </div>

        <img
          className={styles.container__left__image}
          src={art[2]}
          alt="illustration"
        />

        <div>
          <Button title="Buy now" onClick={() => purchaseNFT(tokenId)} />
        </div>
      </div>

      <div className={styles.container__right}>
        <div className={styles.container__right__title}>Artwork comments</div>
        <div className={styles.container__right__subtitle}>
          You must join the community to comment on this NFT
        </div>

        <div className={styles.container__error}>{error}</div>

        <Input
          textarea
          label="Comment"
          value={commentMessage}
          className={styles.container__right__input}
          onChange={({ target: { value } }) => setCommentMessage(value)}
        />
        <Button
          title="Send"
          className={styles.container__right__button}
          disabled={!commentMessage}
          onClick={comment}
          loading={loading}
        />

        <div className={styles.container__right__comments}>
          {comments.map((comment: any) => (
            <div
              key={comment[1]}
              className={styles.container__right__comments__comment}
            >
              <div className={styles.container__right__comments__message}>
                {comment[1]}
              </div>
              <div className={styles.container__right__comments__date}>
                {comment[2]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArtPage;
