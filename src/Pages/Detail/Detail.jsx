import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, deleteHotel } from "../../redux/actions";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import "./detail.styles.css";

const Detail = () =>{

  const token = localStorage.getItem('token')

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = (id) => {
    dispatch(deleteHotel(id));
    window.alert("The card has been successfully deleted");
    navigate("/");
    window.location.reload();
  };

  const renderStars = (count) => {
    const starsArray = Array.from({ length: count }, (_, index) => (
      <span key={index} role="img" aria-label="star">
        ⭐
      </span>
    ));
    return starsArray;
  };

  useEffect(() => {
    if (id) {
      dispatch(getDetail(id));
    }
  }, [dispatch, id]);

  const hotel = useSelector((state) => state.hotelDetail);

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: -20 }} // Estado inicial de la animación
      animate={{ opacity: 1, y: 0 }} // Estado final de la animación
      transition={{ duration: 0.5 }} // Duración de la animación
    >
      <div className="icons">
        <Link to="/">
          <i className="bi bi-arrow-left-circle" title="Return home"></i>
        </Link>
        <Link to={`/update/${hotel.id}`}>
          <i className="bi bi-pencil-square" title="Update"></i>
        </Link>
        <i
          className="bi bi-trash"
          onClick={() => handleDelete(id)}
          title="Delete"
        ></i>
      </div>

      {hotel ? (
        <div className="informationContainer">
          <h1>{hotel.name}</h1>
          <img src={hotel.image} alt={hotel.name} />
          <h2>{renderStars(hotel.stars)}</h2>
          <h2>Price per night: ${hotel.price}</h2>
          <h2>
            <FaMapMarkerAlt className="info-icon" />
            Address: {hotel.address}
          </h2>
          <h2>
            <FaMapMarkerAlt className="info-icon" />
            Country: {hotel.country && hotel.country.name}
          </h2>
          <h2>
            <FaMapMarkerAlt className="info-icon" />
            Location: {hotel.address_url}
          </h2>
          <h2>
            <FaEnvelope className="info-icon" />
            Contact: {hotel.email}
          </h2>
        </div>
      ) : (
        <p>cargando...</p>
      )}
    </motion.div>
  );
};
export default Detail;