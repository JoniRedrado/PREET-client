import { motion } from "framer-motion";
import { postFavorite, removeFavorite} from "../../redux/actions";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import styles from "./Card.module.css";
import { useDispatch} from "react-redux";
import { useState, useEffect } from "react";
import notFavorite from "../../assets/notFavorite.png";
import Favorite from "../../assets/Favorite.png";
import { useNavigate } from "react-router-dom";
import Map from "../Map/Map";
import { useTranslation } from "react-i18next";

const Card = (props) => {
  const { id, name, address, image, country, rooms, stars, dataScroll } = props;
  const { darkMode } = useDarkMode();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const { index, scrollToFirstCard } = dataScroll;
    index === 1 && scrollToFirstCard();

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isCurrentlyFavorite = favorites.some((favorite) => favorite.id === id);
    setIsFavorite(isCurrentlyFavorite);
  }, []);

  const handleAddressClick = () => {
    setIsMapOpen(true);
  };

  const handleCloseModal = () => {
    setIsMapOpen(false);
  };
  const renderStars = (count) => {
    const starsArray = Array.from({ length: count }, (_, index) => (
      <span key={index} role="img" aria-label="star">
        ⭐
      </span>
    ));
    return starsArray;
  };

  const handleFavoriteToggle = () => {
    // Alternar entre agregar y eliminar favoritos
    if (isFavorite) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(postFavorite(id));
    }
    setIsFavorite(!isFavorite);
  };

  const handleClick = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <div
      className={`${styles.card} ${darkMode ? styles.darkMode : ""}`}
      ref={dataScroll.index === 0 ? dataScroll.refCard : null}
    >
      <div className={styles.cardImage}>
        {token ? (
          <div
            className={styles.favoriteIcon}
            onClick={handleFavoriteToggle}
          >
            {isFavorite ? (
              <img src={Favorite} alt="Favorite" className={styles.fav} />
            ) : (
              <img  src={notFavorite} alt="notFavorite" className={styles.fav} />
            )}
          </div>
        ) : (
          ""
        )}
        <motion.img
          src={image}
          className={styles.mainImage}
          alt="hotel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardTexts}>
          <h5 className={styles.cardTitle}>{name ? name : "N/A"}</h5>
          <p className={styles.cardStars}>
            {stars ? renderStars(stars) : "N/A"}
          </p>
          <div className={styles.countryDiv}>
            <p className={styles.country}>{country ? country : "N/A"}</p>
            <p onClick={handleAddressClick} className={styles.address}>
              {t("Card.map")}
            </p>
          </div>
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.priceContainer}>
            <p className={styles.priceText}>{t("Card.price")}</p>
            <p className={styles.priceNumber}>
              ${rooms.length > 0 ? rooms[0].price : "N/A"}
            </p>
          </div>

          <button className={styles.button} onClick={handleClick}>
            {t("Card.book")}
          </button>
        </div>
      </div>
      {isMapOpen && (
        <Map
          isOpen={isMapOpen}
          onRequestClose={handleCloseModal}
          address={address}
        />
      )}
    </div>
  );
};

export default Card;
