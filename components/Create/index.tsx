import React from "react";
import { useRef } from "react";
import { create } from "ipfs-http-client";
import Input from "components/common/Input";
import styles from "./index.module.scss";
import { FileDrop } from "react-file-drop";
import Button from "components/common/Button";
import { useState } from "react";
import { ethers } from "ethers";
import { abi, privateMarketAddress } from "constant";
import { useEffect } from "react";

type Props = {
  onPublished: (url: string) => void;
};

const Create: React.FC<Props> = ({ onPublished }) => {
  const [error, setError] = useState<string>();
  const [fileURL, setFileURL] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [artName, setArtName] = useState();
  const [artPrice, setArtPrice] = useState();
  const [artURL, setArtURL] = useState<string>();
  const [file, setFile] = useState();

  const fileInputRef = useRef(null);

  const onFileDrop = (files: any) => {
    onFiles(files);
  };

  const onFiles = (files: any) => {
    console.log(files[0]);
    setFile(files[0]);
  };

  const onFileInputChange = (event: any) => {
    const { files } = event.target;
    onFiles(files);
  };

  const onTargetClick = () => {
    fileInputRef?.current?.click();
  };

  const onPublish = async () => {
    setLoading(true);

    if (file) {
      const client = create("https://ipfs.infura.io:5001/api/v0");
      const published = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${published.path}`;

      setArtURL(url);
      await mintNewNFT(url);
      onPublished(url);
    }
  };

  useEffect(() => {
    if (typeof window !== undefined && file) {
      setFileURL(URL.createObjectURL(file));
    }
  }, [file]);

  const mintNewNFT = async (url: string) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(privateMarketAddress, abi, provider);
      const contractSigner = contract.connect(signer);
      await contractSigner.createToken(
        url,
        ethers.utils.parseEther(artPrice),
        artName
      );
      setLoading(false);
    } catch (e) {
      setError(
        "You do not belong to the community yet. You must own one of our NFTs to publish."
      );
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__title}>Create new NFT artwork</div>
      <div className={styles.container__subtitle}>
        Publish to the community smart contract
      </div>

      <div className={styles.container__error}>{error}</div>

      <Input
        label="Artwork name"
        placeholder="Name"
        value={artName}
        onChange={({ target: { value } }) => setArtName(value)}
      />

      <Input
        label="Artwork price"
        placeholder="Price in ETH"
        type="number"
        value={artPrice}
        onChange={({ target: { value } }) => setArtPrice(value)}
      />

      <FileDrop
        className={styles.container__upload}
        targetClassName={styles.container__upload__target}
        onTargetClick={onTargetClick}
        onDrop={onFileDrop}
        dropEffect="move"
      >
        {fileURL && (
          <img
            src={fileURL}
            className={styles.container__upload__image}
            alt="illustration"
          />
        )}
        <span className={styles.container__upload__title}>
          Click or drag and drop to upload your NFT image
        </span>

        <input
          onChange={onFileInputChange}
          ref={fileInputRef}
          type="file"
          className={styles.container__upload__input}
          inputProps={{ accept: "image/*" }}
        />
      </FileDrop>

      <Button
        title="Publish"
        loading={loading}
        className={styles.container__button}
        disabled={!file || !artName || !artPrice}
        onClick={onPublish}
      />
    </div>
  );
};

export default Create;
