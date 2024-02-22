import { useState, useEffect, Suspense } from "react";
import { useParams, Link } from 'react-router-dom'; 
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import { useTranslation } from "react-i18next";
import axios from "axios";
import styles from "./BookingDetails.module.css"


const BookingDetails = () => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { t } = useTranslation();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${import.meta.env.VITE_BACK_URL}/bookings/by/${id}`);
        setBooking(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Realizar cualquier limpieza necesaria
    };
  }, [id]); // Ejecutar useEffect cada vez que id cambie

  console.log(booking);
  if (loading) {
    return <div className={styles.loading}>{t("BookingDetails.load")}</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error.message}</div>;
  }

  return (
    <div className={`${styles.mainContainer} ${darkMode ? styles.darkMode: ""}`}>
            <Link to="/myReservations" className={styles.backButton}>
        &lt; {t("BookingDetails.back")}
      </Link>
      <h1 className={styles.title}>{t("BookingDetails.title")}</h1>
      <div className={styles.bookingInfo}>
        <h2>{t("BookingDetails.subtitle1")}</h2>
        <p><strong>{t("BookedSuccesfully.name")}</strong> {booking.user.name} {booking.user.last_name}</p>
        <p><strong>Email:</strong> {booking.user.email}</p>
        <p><strong>{t("BookedSuccesfully.amount")}</strong> ${booking.amount}</p>
        <p><strong>{t("BookedSuccesfully.init")}</strong> {new Date(booking.dateInit).toLocaleDateString()}</p>
        <p><strong>{t("BookedSuccesfully.final")}</strong> {new Date(booking.dateFinal).toLocaleDateString()}</p>
        <p><strong>{t("BookedSuccesfully.nights")}</strong> {booking.nights}</p>
        <p><strong>{t("BookedSuccesfully.payment")}</strong> {booking.pay}</p>
      </div>
      <div className={styles.roomInfo}>
        <h2>{t("BookingDetails.subtitle1")}</h2>
        <p><strong>Hotel:</strong> {booking.room.hotel.name}</p>
        <p><strong>{t("BookingDetails.type")}</strong> {booking.room.type}</p>
        <p><strong>{t("BookingDetails.numeration")}</strong> {booking.room.numeration}</p>
        <p><strong>{t("BookingDetails.guests")}</strong> {booking.room.guest}</p>
        <p><strong>{t("BookingDetails.description")}</strong> {booking.room.description}</p>
        <div className={styles.roomImages}>
          <img src={booking.room.image[0].image} alt="Room" />
        </div>
      </div>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Suspense>
      <BookingDetails />
    </Suspense>
  );
}