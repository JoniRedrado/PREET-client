import { motion } from "framer-motion";
import { postFavorite } from "../../redux/actions";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import styles from "./Card.module.css"; 
import { useDispatch } from "react-redux";
import { useState } from "react";
import notFavorite from "../../assets/notFavorite.png"
import Favorite from "../../assets/Favorite.png"
import { useNavigate } from "react-router-dom";
import Map from "../Map/Map";

const Card = (props) => {
  const { id, name, address, image, country, rooms, stars, refComponent } = props;
  const { darkMode } = useDarkMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const token = localStorage.getItem("token");
  const cardVariants = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.4,
      },
    },
  };
  
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

  const handleAddToFavorites = () => {
    dispatch(postFavorite(id));
    setIsFavorite(!isFavorite);
  };

  const handleClick = () => {
    navigate(`/detail/${id}`)
  }

  return (
      <motion.div
        className={`${styles.card} ${darkMode ? styles.darkMode : ""}`}
        variants={cardVariants}
        whileHover="hover"
        ref={refComponent.index === 0 ? refComponent.refCard : null}
      >

      <div className={styles.cardImage}>
        {token ? (
          <div
            className={styles.favoriteIcon}
            onClick={isFavorite ? null : handleAddToFavorites}
          >
            {isFavorite ? (
              <img src={Favorite} alt="Favorite" className={styles.fav}/>
            ) : (
              <img src={notFavorite} alt="notFavorite" className={styles.fav}/>
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
          <p className={styles.cardStars}>{stars ? renderStars(stars) : "N/A"}</p> 
          <p onClick={handleAddressClick} className={styles.address}>{address ? address : "N/A"} {country ? country : "N/A"}</p>
        </div>
        <div className={styles.cardFooter}>
          <p className={styles.price}>
            Starting from ${rooms.length > 0 ? rooms[0].price : "N/A"}
          </p>
          <button className={styles.button} onClick={handleClick}>Book Now</button>
        </div>
        </div>
        {isMapOpen && (
        <Map
          isOpen={isMapOpen}
          onRequestClose={handleCloseModal}
          address={address}
        />
      )}
    </motion.div>
  );
};

export default Card;