import { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../../assets/Loading.gif'
import { FaCheckCircle } from 'react-icons/fa';
import styles from "./BookedSuccesfully.module.css";
import { useNavigate } from 'react-router-dom';

const BookedSuccesfully = () => {
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null)
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
    <div className={styles.mainContainer}>
      <FaCheckCircle className={`${styles.icon} ${styles.tickIcon}`} />
    <h2 className={styles.title}>¡Booking Succesfully Completed!</h2>
    <div className={styles.bookingInfo}>
        <h2>Booking Information</h2>
        <p><strong>Name:</strong> {booking.user.name} {booking.user.last_name}</p>
        <p><strong>Email:</strong> {booking.user.email}</p>
        <p><strong>Amount:</strong> ${booking.amount}</p>
        <p><strong>Date Init:</strong> {new Date(booking.dateInit).toLocaleDateString()}</p>
        <p><strong>Date Final:</strong> {new Date(booking.dateFinal).toLocaleDateString()}</p>
        <p><strong>Nights:</strong> {booking.nights}</p>
        <p><strong>Payment Reference:</strong> {booking.pay}</p>
    </div>
    <button className={styles.button} onClick={handleClick}>Booking Details</button>
  </div>
);
}

export default BookedSuccesfully;