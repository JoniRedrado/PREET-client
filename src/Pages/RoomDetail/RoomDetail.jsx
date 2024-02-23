/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { showModal } from "../../redux/actions";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "./RoomDetail.styles.css";
import { useNavigate } from "react-router-dom";

const RoomDetail = ({ room }) => {
  const [isBooking, setIsBooking] = useState(false);
  const { darkMode } = useDarkMode();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filters = useSelector((state) => state.submitFilters);

  const token = localStorage.getItem("token");
  
  const handleBook = () => {

    if (!filters.startDate || !filters.endDate) {
      swal({
        title: "Hold on!",
        text: "In order to proceed you need to set your check-in and check-out dates",
        icon: "warning",
        button: "OK",
      })
      dispatch(showModal("roomDetail", false));
    } else {
      setIsBooking(true);
      const bookingInfo = {
        roomId: room.id,
        user: localStorage.getItem("token"),
        price: room.price,
        dateInit: filters.startDate,
        dateFinal: filters.endDate,
      };
  
      const handleLoginClick = () => {
        navigate("/login");
      };
  
      if (!token) {
        swal({
          title: "Please login",
          text: "In order to complete your payment and get your reservation confirmation",
          icon: "error",
          buttons: {
            cancel: "Cancel",
            login: {
              text: "Login",
              value: "login",
            },
          },
        }).then((value) => {
          if (value === "login") {
            handleLoginClick();
          }
        });
      } else {
        axios
          .post(
            `${import.meta.env.VITE_BACK_URL}/payment/create-order`,
            bookingInfo
          )
          .then((res) => {
            window.location.href = res.data.links[1].href;
          })
          .catch((error) => {
            console.error("Error creating order:", error);
          });
      }
      
    }
  };

  if (!room) {
    return null; //Al cerrar el modal ocurría un error porque se establece selectedRoom
  } //como null en la const closeModal (Detail.jsx). Esto arregla el error.
  console.log(room);
  return (
    <div className={`card-room ${darkMode ? "darkMode" : ""}`}>
      <img
        src={room.image[0]}
        alt={`Room ${room.id}`}
        className="card-img-top room-image"
      />

      <div className="card-body">
        <h1 className="card-title">{room.type}</h1>
        <p className="card-text">{room.description}</p>
        <p className="card-text">
          {t("CreateRooms.price")} {room.price} $
        </p>
        <button onClick={handleBook}>
          {t("Card.book")}
          <i className="bi bi-paypal paypal"></i>
        </button>
      </div>
    </div>
  );
};

export default RoomDetail;
