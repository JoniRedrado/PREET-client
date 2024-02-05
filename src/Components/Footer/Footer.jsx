import React from 'react';
import template from "../../assets/Logo-White.svg";
import styles from "./Footer.module.css"

const Footer = () => {
  return (
      <div className={styles.container}>
        <div className={styles.footerInfo}>
          <p>&copy; 2024 Preet. All rights reserved.</p>
        </div>
      </div>
  );
};

export default Footer;