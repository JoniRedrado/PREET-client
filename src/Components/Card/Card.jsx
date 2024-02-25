/* eslint-disable react/prop-types */
import { postFavorite, removeFavorite} from "../../redux/actions";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import styles from "./Card.module.css";
import { useDispatch, useSelector} from "react-redux";
import { useState, useEffect } from "react";
import notFavorite from "../../assets/notFavorite.png";
import Favorite from "../../assets/Favorite.png";
import { useNavigate } from "react-router-dom";
import Map from "../Map/Map";
import { useTranslation } from "react-i18next";
import axios from "axios";
import icon1 from "../../assets/icon1.png"
import icon2 from "../../assets/icon2.png"
import icon3 from "../../assets/icon3.png"

const Card = (props) => {
  const { id, name, address, image, country, rooms, stars, dataScroll } = props;
  const { darkMode } = useDarkMode();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [ranking, setRanking] = useState({
    count: "",
    avarage: ""
  })
  const [isMapOpen, setIsMapOpen] = useState(false);
  const token = localStorage.getItem("token");
  const globalCurrency = useSelector((state) => state.currency)
  const [convertedPrice, setConvertedPrice] = useState(null)

  useEffect(() => {
    axios
    .get(`${import.meta.env.VITE_BACK_URL}/feedback/hotel/${id}`)
    .then((response) =>{
      setRanking({
        count: response.data.feedback.count,
        avarage:response.data.avgScore.avgScore
      })
    })
    .catch((error) => {
      console.error(error);
    });
    const { index, scrollToFirstCard } = dataScroll;
    index === 1 && scrollToFirstCard();

    // const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    // const isCurrentlyFavorite = favorites.some((favorite) => favorite.id === id);
    // setIsFavorite(isCurrentlyFavorite);
  }, []);

  useEffect(() => {
    if (rooms.length > 0) {
      currencyConverter(rooms[0].price);
    }
  }, [rooms, globalCurrency]);

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

  const currencyConverter = async (fromCurrency) => {
    try {
      const response = await axios.get(`https://openexchangerates.org/api/latest.json?app_id=${import.meta.env.VITE_CURRENCY_API}&base=USD`)
    
      const toCurrency = response.data.rates[globalCurrency]
  
      const result = Math.round(fromCurrency * toCurrency);

      setConvertedPrice(result)
    } catch (error) {
      console.error(error)
    }
  }

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
        <img
          src={image}
          className={styles.mainImage}
          alt="hotel"
        />
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardTexts}>
          <div className={styles.header}>
            <h5 className={styles.cardTitle}>{name ? name : "N/A"}</h5>
            {ranking && (            
            <div className={styles.rankingDiv}>
            <p className={styles.ranking}>{ranking.avarage} of 5</p>
            <span className={styles.reviews}>({ranking.count} reviews)</span>
            </div>)}
          </div>
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
        <div className={styles.services}>
          <div className={styles.iconContainer}>
          <img src={icon1} alt="services" className={styles.icon}/>
          <p>Free wifi</p>
          </div>
          <div className={styles.iconContainer}>
          <img src={icon2} alt="services" className={styles.icon}/>
          <p>Gym</p>
          </div>
          <div className={styles.iconContainer}>
          <img src={icon3} alt="services" className={styles.icon}/>
          <p>Room service</p>
          </div>
          </div>
        <div className={styles.cardFooter}>
          <div className={styles.priceContainer}>
            <p className={styles.priceText}>{t("Card.price")}</p>
            <p className={styles.priceNumber}>
              {globalCurrency}
              ${convertedPrice !== null ? convertedPrice : "N/A"}
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
