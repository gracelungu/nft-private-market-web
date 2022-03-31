import Input from "components/common/Input";
import React from "react";
import { useRef } from "react";
import styles from "./index.module.scss";
import { FileDrop } from "react-file-drop";
import Button from "components/common/Button";

function Create() {
  const fileInputRef = useRef(null);

  const onFileDrop = (files: any) => {
    onFiles(files);
  };

  const onFiles = (files: any) => {};

  return (
    <div className={styles.container}>
      <div className={styles.container__title}>Create new NFT artwork</div>
      <div className={styles.container__subtitle}>
        Publish to the Binance smart chain
      </div>

      <Input label="Artwork name" placeholder="Artwork title" />
      <FileDrop
        className={styles.container__upload}
        targetClassName={styles.container__upload__target}
        // onTargetClick={onTargetClick}
        onDrop={onFileDrop}
        dropEffect="move"
      >
        <span className={styles.container__upload__title}>
          Click or drag and drop to upload your NFT image
        </span>

        <input
          // onChange={onFileInputChange}
          ref={fileInputRef}
          type="file"
          className={styles.container__upload__input}
          inputProps={{ accept: "image/*" }}
          multiple
        />
      </FileDrop>

      <Button title="Publish" className={styles.container__button} />
    </div>
  );
}

export default Create;
