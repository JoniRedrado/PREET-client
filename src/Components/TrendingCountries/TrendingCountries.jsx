import { useDispatch } from "react-redux";
import { filterParams, filterHotels, specificPage } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./TrendingCountries.module.css";
import ARG from "../../assets/ARG.png";
import PhotoArg from "../../assets/PhotoArg.jpg";
import UY from "../../assets/UY.png";
import PhotoUy from "../../assets/PhotoUy.jpg";
import COL from "../../assets/COL.png";
import PhotoCol from "../../assets/PhotoCol.jpg";
import BR from "../../assets/BR.png";
import PhotoBr from "../../assets/PhotoBr.jpg";
import PER from "../../assets/PER.png";
import PhotoPer from "../../assets/PhotoPer.jpg";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

const countryData = [
  { name: "Argentina", flag: ARG, photo: PhotoArg },
  { name: "Uruguay", flag: UY, photo: PhotoUy },
  { name: "Colombia", flag: COL, photo: PhotoCol },
  { name: "Brazil", flag: BR, photo: PhotoBr },
  { name: "Peru", flag: PER, photo: PhotoPer }
];

const TrendingCountries = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCountryClick = (countryName) => {
    dispatch(filterParams({ name: countryName, guest: 1 })); 
    dispatch(specificPage(1)); 
    dispatch(filterHotels({ name: countryName, guest: 1 })); 
    navigate(`/search/`)
  };

  const cardVariants = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
      <span className={styles.title}>{t("Trending.title")}</span>
      <p>{t("Trending.subtitle")}</p>
      </div>
      <div className={styles.upperDiv}>
        {countryData.slice(0, 2).map((country, index) => (
          <motion.div 
            className={styles.countryContainer1} 
            key={index}
            variants={cardVariants}
            whileHover="hover"
            onClick={() => handleCountryClick(country.name)}
          >
            <img src={country.photo} alt={country.name} className={styles.upperPhotos}/>
            <div className={styles.textContainer1}>
              <span className={styles.countryName}>{country.name}</span>
              <img src={country.flag} alt={`${country.name} Flag`} className={styles.flag1} />
            </div> 
          </motion.div>
        ))}
      </div>
      <div className={styles.lowerDiv}>
        {countryData.slice(2).map((country, index) => (
          <motion.div 
            className={styles.countryContainer2} 
            key={index}
            variants={cardVariants}
            whileHover="hover"
            onClick={() => handleCountryClick(country.name)}
          >
            <img src={country.photo} alt={country.name} className={styles.lowerPhotos}/>
            <div className={styles.textContainer2}>
              <span className={styles.countryName}>{country.name}</span>
              <img src={country.flag} alt={`${country.name} Flag`} className={styles.flag2} />
            </div>  
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function WrappedApp() {
  return (
    <Suspense>
      <TrendingCountries />
    </Suspense>
  );
}