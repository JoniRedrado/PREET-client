import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, deleteHotel, postFavorite } from "../../redux/actions";
import { motion } from "framer-motion";
import { FaMapMarkerAlt /* , FaEnvelope */ } from "react-icons/fa";
import RoomDetail from "../RoomDetail/RoomDetail";
import CommentsInDetail from "../../Components/ComentsInDetail/CommentsInDetail";
import Modal from "react-modal";
import "./detail.styles.css";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import { showModal } from "../../redux/actions";
// import axios from "axios";

const Detail = () => {
  const token = localStorage.getItem("token");
  // <RoomDetail key={room.id} room={room} price={room.price} />
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const { id } = useParams();

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);


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
  const modalRoomDetail = useSelector((state) => state.showModal.roomDetail);

  const handleRoomSelect = (roomType) => {
    const selectedRoom = hotel.rooms.find((room) => room.type === roomType);
    setSelectedRoom(selectedRoom);
    dispatch(showModal("roomDetail", true));
  };

  const closeModal = () => {
    setSelectedRoom(null);
    dispatch(showModal("roomDetail", false));
  };

  // //Integracion con PayPal
  // const handleBook = () => {
  //   //Objeto para enviar info de la reserva al backend, crear la orden de y luego guardar la reserva en la DB
  //   const bookingInfo = {
  //     user: localStorage.getItem('user_id'),
  //     name: hotel.name,
  //     price: hotel.price,
  //     id: hotel.id,
  //     initialDate: new Date(),
  //     finalDate: new Date(),

  //   }
  //   //Peticion POST para crear la orden, luego redireccionar a la url de PayPal, ahi el usuario ingresa con su cuenta y realiza el pago.
  //   //Una vez realizado o cancelado el pago, paypal te devuelve a nuestra app
  //   //Cuenta de prueba paypal:
  //   //email: sb-ujxlq29504971@personal.example.com
  //   //password: /$>7^oW<
  //   axios.post('${import.meta.env.VITE_BACK_URL}/payment/create-order', bookingInfo)
  //     .then(res => {
  //       window.location.href = res.data.links[1].href
  //     })
  // }

  const handleAddToFavorites = () => {
    dispatch(postFavorite(id));
    setIsFavorite(!isFavorite);
    localStorage.setItem(`favorite_${id}`, "true");
  };

  return (
    <motion.div
      className={`container ${darkMode ? "darkMode" : ""}`}
      initial={{ opacity: 0, y: -20 }} // Estado inicial de la animación
      animate={{ opacity: 1, y: 0 }} // Estado final de la animación
      transition={{ duration: 0.5 }} // Duración de la animación
    >
      <div className="icons">
        <Link to="/">
          <i className="bi bi-arrow-left-circle" title="Return home"></i>
        </Link>
        {token ? (
          <>
            <Link to={`/update/${hotel.id}`}>
              <i className="bi bi-pencil-square" title="Update"></i>
            </Link>
            <i
              className="bi bi-trash"
              onClick={() => handleDelete(id)}
              title="Delete"
            ></i>
            <div className="icon" onClick={isFavorite ? null : handleAddToFavorites}>
              {isFavorite ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"> </i>}
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      {hotel ? (
        <div className="informationContainer">
          <h1>{hotel.name}</h1>
          <img src={hotel.image} alt={hotel.name} />
          <h2>{renderStars(hotel.stars)}</h2>
          {/* <h2>Price per night: ${hotel.price}</h2> */}
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
          <h2>Available Rooms:</h2>
          <select
            className="selectRoom"
            defaultValue="Select you room"
            onChange={(e) => handleRoomSelect(e.target.value)}
          >
            <option disabled>Select you room</option>
            {hotel.rooms && hotel.rooms.length > 0 ? (
              hotel.rooms.map((room) => (
                <option key={room.id} value={room.type}>
                  {room.type}
                </option>
              ))
            ) : (
              <option disabled>No rooms available</option>
            )}
          </select>
          <h2>Guests Reviews:</h2>
          <CommentsInDetail className="comments"/>
        </div>
      ) : (
        <p>cargando...</p>
      )}
      <Modal
        isOpen={modalRoomDetail}
        onRequestClose={closeModal}
        className="modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <i onClick={closeModal} className="bi bi-arrow-left-circle return"></i>
        <RoomDetail room={selectedRoom} />
      </Modal>
    </motion.div>
  );
};

export default Detail;
