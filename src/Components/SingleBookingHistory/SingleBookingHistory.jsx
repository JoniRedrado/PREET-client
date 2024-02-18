/* eslint-disable react/prop-types */
import './SingleBookingHistory.styles.css'

const SingleBooking = ({image, room, amount, nights, dateInit, dateFinal}) => {
    return (
        <div className='reservation-card'>
            <div className='image-container'>
                <img src={image} alt="imagenHotel" className="reservation-image" />
            </div>
            <div className='reservation-info'>
                <h3>{room}</h3>
                <p>From <strong>{dateInit.slice(0, 10)}</strong> to <strong>{dateFinal.slice(0,10)}</strong> <span>({nights} nights)</span></p>
                <p>Amount paid: <span>${amount}</span></p>
            </div>
        </div>
    )
}

export default SingleBooking