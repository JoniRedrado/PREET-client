import styles from "./BookingDetails.module.css"
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'; 
import axios from "axios";

const BookingDetails = () => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Obtener el id de la URL

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

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error.message}</div>;
  }
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>Booking Details</h1>
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
      <div className={styles.roomInfo}>
        <h2>Room Information</h2>
        <p><strong>Type:</strong> {booking.room.type}</p>
        <p><strong>Numeration:</strong> {booking.room.numeration}</p>
        <p><strong>Guests:</strong> {booking.room.guest}</p>
        <p><strong>Description:</strong> {booking.room.description}</p>
        <div className={styles.roomImages}>
          <img src={booking.room.image[0].image} alt="Room" />
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;