import axios from "axios";
import { useState, useEffect, Suspense } from "react";
import SingleBooking from "../../Components/SingleBookingHistory/SingleBookingHistory";
import { useTranslation } from "react-i18next";

import "./BookingsHistory.styles.css";

const BookingsHistory = () => {

  const [userReservations, setUserReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const [userReviews, setUserReviews] = useState({})

    const getUserReservations = async () => {
        try {
            const {data}  = await axios.get(`${import.meta.env.VITE_BACK_URL}/bookings/user`)
            
            setUserReservations(data.bookings)
            console.log(data.bookings)
        } catch (error) {
            console.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    console.log(userReviews);
    const getUserReviews = async () => {
        try {
            const {data}  = await axios.get(`${import.meta.env.VITE_BACK_URL}/feedback/user`)
            setUserReviews(data)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getUserReservations()
        getUserReviews()
    }, [])

    return (
        <div className="reservations-container">
            <h1 className="reservations-title">{t("HistoryBkng.title")}</h1>
            {isLoading ? (
                <img src="https://cdn.pixabay.com/animation/2023/03/20/02/45/02-45-27-186_512.gif" alt="loading"/>
            ) : (
            userReservations.length === 0 ? (
                <div className="empty-history">
                    <img src="notFound.png" alt="Booking-Not-Found" />
                    <h1>{t("HistoryBkng.message")}</h1>
                </div>
            ) : (
                <div>
                    {userReservations.map((reservation) => {
                        return <SingleBooking 
                        key={reservation.id}
                        hotelName={reservation.room.hotel.name}
                        hotelId ={reservation.id}
                        image={reservation.room.image[0].image}
                        amount={reservation.amount}
                        nights={reservation.nights}
                        dateInit={reservation.dateInit}
                        dateFinal={reservation.dateFinal}
                        room={reservation.room.type}
                        roomId={reservation.roomId}
                        reviews={userReviews}
                        />
                    })}
                </div>
            )
        )}
    </div>
  );
};

export default function WrappedApp() {
  return (
    <Suspense>
      <BookingsHistory />
    </Suspense>
  );
}
