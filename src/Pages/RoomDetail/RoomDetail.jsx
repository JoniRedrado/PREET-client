/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { showModal } from "../../redux/actions";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import { useDispatch, useSelector } from "react-redux";
import "./RoomDetail.styles.css";

const RoomDetail = ({ room }) => {
  const [isBooking, setIsBooking] = useState(false);
  const { darkMode } = useDarkMode();
  const dispatch = useDispatch();

  const filters = useSelector((state) => state.submitFilters);
  console.log(room);
  console.log(filters);

  const token = localStorage.getItem("token");

  const handleBook = () => {
    setIsBooking(true);
    const bookingInfo = {
      roomId: room.id,
      user: localStorage.getItem("token"),
      price: room.price,
      dateInit: filters.startDate,
      dateFinal: filters.endDate,
    };

    console.log(bookingInfo);
    console.log(!token);

    const handleLoginClick = () => {
      dispatch(showModal("login", true));
      dispatch(showModal("roomDetail", false));
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
  };

  if (!room) {
    return null; //Al cerrar el modal ocurría un error porque se establece selectedRoom
  } //como null en la const closeModal (Detail.jsx). Esto arregla el error.

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
        <p className="card-text">Price {room.price} $</p>
        <button onClick={handleBook}>
          Book now
          <i className="bi bi-paypal paypal"></i>
        </button>
      </div>
    </div>
  );
};

export default RoomDetail;
