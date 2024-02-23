import React, { useState } from "react";
import styles from "./FileInput.module.css";

const FileInput = ({ onChange }) => {
  const handleFileChange = (e) => {
    onChange(e);
  };

  return (
    <div className={styles.fileInput}>
      <label htmlFor="file" className={styles.fileInputLabel}>
        Select a file
      </label>
      <input
        type="file"
        id="file"
        accept="image/*"
        onChange={handleFileChange}
        className={styles.fileInputHidden}
      />
    </div>
  );
};

export default FileInput;