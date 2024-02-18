import axios from "axios"
import { useEffect, useState } from "react";

import SingleBooking from "../../Components/SingleBookingHistory/SingleBookingHistory";

import './BookingsHistory.styles.css'

const BookingsHistory = () => {
    
    const [userReservations, setUserReservations] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    const getUserReservations = async () => {
        try {
            const {data}  = await axios.get(`${import.meta.env.VITE_BACK_URL}/bookings/user`)
            
            setUserReservations(data.bookings)
        } catch (error) {
            console.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    console.log(userReservations);

    useEffect(() => {
        getUserReservations()
    }, [])

    return (
        <div className="reservations-container">
            <h1 className="reservations-title">My Reservations</h1>
            {isLoading ? (
                <img src="https://cdn.pixabay.com/animation/2023/03/20/02/45/02-45-27-186_512.gif" alt="loading"/>
            ) : (
            userReservations.length === 0 ? (
                <div className="empty-history">
                    <img src="notFound.png" alt="Booking-Not-Found" />
                    <h1>You dont have any reservations yet.</h1>
                </div>
            ) : (
                <div>
                    {userReservations.map((reservation) => {
                        return <SingleBooking 
                        key={reservation.id}
                        image={reservation.room.image[0].image}
                        amount={reservation.amount}
                        nights={reservation.nights}
                        dateInit={reservation.dateInit}
                        dateFinal={reservation.dateFinal}
                        room={reservation.room.type}/>
                    })}
                </div>
            )
        )}
    </div>
)}

export default BookingsHistory