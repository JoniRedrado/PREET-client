/* eslint-disable react/prop-types */
import './SingleBookingHistory.styles.css'

const SingleBooking = ({image, date, room}) => {
    return (
        <div className='reservation-container'>
            <img src={image} alt="imagenHotel" className="reservation-image" />
            <div className='reservation-info'>
                <h3>{date}</h3>
                <h3>Room</h3>
                <p>{room}</p>
            </div>
        </div>
    )
}

export default SingleBooking