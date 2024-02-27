/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { showModal } from "../../redux/actions";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "./RoomDetail.styles.css";
import { useNavigate } from "react-router-dom";

const RoomDetail = ({ room }) => {
  const { darkMode } = useDarkMode();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filters = useSelector((state) => state.submitFilters);
  const globalCurrency = useSelector((state) => state.currency)
  const [convertedPrice, setConvertedPrice] = useState(globalCurrency)

  const token = useSelector(state => state.token);

  const handleBook = () => {
    if (!filters.startDate || !filters.endDate) {
      swal({
        title: t("RoomDetail.swalWarningTitle"),
        text: t("RoomDetail.swalWarningText"),
        icon: "warning",
        button: "OK",
      });
      dispatch(showModal("roomDetail", false));
    } else {
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
          title: t("RoomDetail.swalErrorTitle"),
          text: t("RoomDetail.swalErrorText"),
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

  useEffect(() => {
      currencyConverter(room.price);
  }, [globalCurrency]);

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
        <p className="card-price">
          {t("CreateRooms.price")} {globalCurrency} ${convertedPrice}
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
