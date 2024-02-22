/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './SingleBookingHistory.styles.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';

const SingleBooking = ({ bookingId, image, hotelName, reservationHotelId, room, roomId, amount, nights, dateInit, dateFinal, reviews}) => {

    const [selectedStars, setSelectedStars] = useState([])
    const [reviewValues, setReviewValues] = useState({})
    const [hotelInUserReviews, setHotelInUserReviews] = useState([])
    const navigate = useNavigate();

    const handleStarClick = (star) => {
        const newSelectedStars = [1, 2, 3, 4, 5].filter((selectedStar) => selectedStar <= star);
        setSelectedStars(newSelectedStars)
        setReviewValues({...reviewValues, score: newSelectedStars.length})
      };
    
      const handleComment = (e) => {
        setReviewValues({...reviewValues, comment: e.target.value})
      };
      
      console.log(reservationHotelId);

      const validateHotelInUserReviews = async (reservationHotelId) => {
            console.log(reviews);
            const foundHotel = await reviews.filter(review => review.hotelId === reservationHotelId);
            console.log(foundHotel);
            setHotelInUserReviews(foundHotel)
 
      }

      console.log(hotelInUserReviews);


      const handleSubmitReview = async (e) => {
        e.preventDefault()
        
        const {score, comment, roomId} = reviewValues
        
        try {
          const response = await axios.post(`${import.meta.env.VITE_BACK_URL}/feedback/${reservationHotelId}`, { score, comment, roomId  })
      
          if (response.status === 200) {        
            swal({
                title: "Thanks!",
                text: "We received your review",
                icon: "success",
                button: "Go back",
              });
          }
        } catch (error) {
          console.error(error)
        }
    
      };

      useEffect(() => {
        validateHotelInUserReviews(reservationHotelId)
        setReviewValues({...reviewValues, roomId: roomId})

        return (() =>
        setHotelInUserReviews([]))
      }, [reviews])

    const handleClick = (id) => {
        navigate(`/bookingDetails/${id}`)
    };

    return (
        <div className='reservation-card'>
            <div className='image-container'>
                <img src={image} alt="imagenHotel" className="reservation-image" />
            </div>
            <div className='reservation-info'>
                <h3>Hotel: {hotelName}</h3>
                <h3>Type of room: {room}</h3>
                <p>From <strong>{dateInit.slice(0, 10)}</strong> to <strong>{dateFinal.slice(0,10)}</strong> <span>({nights === 1 ? `${nights} night` : `${nights} nights`})</span></p>
                <p>Amount paid: <span>${amount}</span></p>
                <button className='button' onClick={() => handleClick(bookingId)}>Details</button>
            </div>
            {console.log(hotelInUserReviews)}
            {!hotelInUserReviews.length ?
                (<div className="review-box-container">
                    <div className="review-stars">
                        <p className="review-tag">Score from 1 to 5</p>
                        <div className="stars-buttons-container">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                key={star}
                                className={`star-button ${selectedStars.includes(star) ? "active-star" : "unactive-star"}`}
                                onClick={() => handleStarClick(star)}>
                                    <span className="star-button-icon" role="img" aria-label="star">&#x2605;</span>
                                </button>
                            ))}
                        </div>
                    </div>
                <div className="review-comments">
                    <p className="review-tag">Comment</p>
                    <textarea name="review-comment" value={reviewValues.comment} onChange={handleComment} className="review-comment-textarea"></textarea>
                </div>
                <button className="review-submit-button" onClick={handleSubmitReview}>Submit</button>
                </div>)
            : ""
            }
        </div>
    )
}

export default SingleBooking