import React from 'react';
import template from "../../assets/Logo-White.svg";
import { Link } from 'react-router-dom';
import { FaEnvelope } from "react-icons/fa";
import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <div className={styles.container}>
      <Link to="/">
        <img src={template} alt="Logo PREET" className={styles.logoFooter} />
      </Link>
      <div className={styles.contact}>
        <FaEnvelope />
        <a href="mailto:contacto.preet@gmail.com">contacto.preet@gmail.com</a>
      </div>
      <div className={styles.footerInfo}>
        <p>&copy; 2024 Preet. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;