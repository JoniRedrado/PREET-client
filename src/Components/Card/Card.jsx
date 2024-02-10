/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaDollarSign,
} from "react-icons/fa";
import { postFavorite } from "../../redux/actions";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import './Card.style.css';
import { useDispatch } from "react-redux";
import { useState } from "react";


const Card = (props) => {
  const { id, name, image, country, rooms, stars, hotelId, token } = props;
  const { darkMode } = useDarkMode(); 
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(localStorage.getItem(`favorite_${id}`) === "true");
  const cardVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
      },
    },
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
    dispatch(postFavorite(hotelId, token));
    setIsFavorite(!isFavorite);
    localStorage.setItem(`favorite_${id}`, "true");
  };

  return (
    <motion.div 
      className={`card mb-3 ${darkMode ? 'darkMode' : ''}`}
      variants={cardVariants}
      whileHover="hover"
    >
       

        <div className="card-image">
          <div className="favorite-icon" onClick={isFavorite ? null : handleAddToFavorites}>
            {isFavorite ? <i class="bi bi-heart-fill"></i> : <i class="bi bi-heart"> </i>}
          </div>
          <motion.img 
            src={image} 
            className="card-img-top" 
            alt="hotel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
      <Link to={`/detail/${id}`} className="card-link">

        <div className="card-body">
          <h5 className="card-title">{name ? name : "N/A"}</h5>
          <p className="card-text">{stars ? renderStars(stars) : "N/A"}</p>
          <p className="card-text">
          <FaMapMarkerAlt className="info-icon" />
            {country ? country : "N/A"}
            </p>
          <p className="card-text">
            Starting from {rooms.length > 0 ? rooms[0].price : "N/A"}
            <FaDollarSign className="info-icon" />
            {}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;