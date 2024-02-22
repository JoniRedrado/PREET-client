import { useEffect, useState, Suspense } from 'react'
import axios from 'axios'
import Loading from '../../assets/Loading.gif'
import { FaCheckCircle } from 'react-icons/fa';
import styles from "./BookedSuccesfully.module.css";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useDarkMode } from '../../DarkModeContext/DarkModeContext';

const BookedSuccesfully = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [booking, setBooking] = useState(null)
    const {darkMode} = useDarkMode()
    const getUserReservations = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACK_URL}/bookings/last`);
          setBooking(data)
          console.log(booking)
      } catch (error) {
          console.error(error.message)
      }
  }

  useEffect(() => {
      getUserReservations()
  }, [])

  if (!booking) {
    return <div className={styles.loading}>{Loading}</div>;
  }

  const handleClick = () => {
    navigate(`/bookingDetails/${booking.id}`)
  };

  return (
    <div className={`${styles.mainContainer} ${darkMode ? styles.darkMode : ''}`}>
      <FaCheckCircle className={`${styles.icon} ${styles.tickIcon}`} />
    <h2 className={styles.title}>{t("BookedSuccesfully.success")}</h2>
    <div className={styles.bookingInfo}>
        <h2>{t("BookedSuccesfully.title")}</h2>
        <p><strong>{t("BookedSuccesfully.name")}</strong> {booking.user.name} {booking.user.last_name}</p>
        <p><strong>Email:</strong> {booking.user.email}</p>
        <p><strong>{t("BookedSuccesfully.amount")}</strong> ${booking.amount}</p>
        <p><strong>{t("BookedSuccesfully.init")}</strong> {new Date(booking.dateInit).toLocaleDateString()}</p>
        <p><strong>{t("BookedSuccesfully.final")}</strong> {new Date(booking.dateFinal).toLocaleDateString()}</p>
        <p><strong>{t("BookedSuccesfully.nights")}</strong> {booking.nights}</p>
        <p><strong>{t("BookedSuccesfully.payment")}</strong> {booking.pay}</p>
    </div>
    <button className={styles.button} onClick={handleClick}>{t("BookedSuccesfully.button")}</button>
  </div>
);
}

export default function WrappedApp() {
  return (
    <Suspense>
      <BookedSuccesfully />
    </Suspense>
  );
}