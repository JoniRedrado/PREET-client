import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaDollarSign,
} from "react-icons/fa";
import './Card.style.css';


const Card = (props) => {
  const { id, name, image, country, price, stars } = props;

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

  return (
    <motion.div 
      className="card mb-3"
      variants={cardVariants}
      whileHover="hover"
    >
      <Link to={`/detail/${id}`} className="card-link">
        <div className="card-image">
          <motion.img 
            src={image} 
            className="card-img-top" 
            alt="hotel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{name ? name : "N/A"}</h5>
          <p className="card-text">{stars ? renderStars(stars) : "N/A"}</p>
          <p className="card-text">
          <FaMapMarkerAlt className="info-icon" />
            {country ? country : "N/A"}
            </p>
          <p className="card-text">
          <FaDollarSign className="info-icon" />
            {price ? price : "N/A"}
            </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;